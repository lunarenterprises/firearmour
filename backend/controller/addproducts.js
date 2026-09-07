var model = require("../model/addproducts");
var formidable = require("formidable");
var fs = require("fs");

module.exports.AddProducts = async (req, res) => {
    try {
        var form = new formidable.IncomingForm({ multiples: true });
        form.parse(req, async function (err, fields, files) {
            if (err) {
                return res.send({
                    result: false,
                    message: "File Upload Failed!",
                    data: err,
                });
            }
            var { name, price, description, category, stocks } = fields;
            if (!name || !price || !description || !category || !stocks) {
                return res.send({
                    result: false,
                    message: "insufficent parameter"
                })
            }
            // console.log(process.env);

            var checkproduct = await model.CheckProduct(name)
            if (checkproduct.length == 0) {
                if (files) {
                    console.log(files);

                    var oldPath = files.image.filepath;
                    var newPath =
                        process.cwd() +
                        "/uploads/products/" +
                        files.image.originalFilename;

                    let rawData = fs.readFileSync(oldPath);
                    fs.writeFile(newPath, rawData, async function (err) {
                        if (err) console.log(err);
                        let imagepath =
                            "/uploads/products/" + files.image.originalFilename;
                        let Addproduct = await model.AddProductQuery(name, category, imagepath, price, description, stocks)
                        console.log(Addproduct.insertId, "Addproduct");

                    })
                    return res.send({
                        result: true,
                        message: "product added successfully"
                    });

                } else {
                    return res.send({
                        result: true,
                        message: "failed to add product"
                    })

                }
            } else {
                return res.send({
                    result: false,
                    message: "this product is alreasy existed"
                })
            }

        })

    } catch (error) {
        console.log(error);
        return res.send({
            result: false,
            message: error.message,
        });
    }

}