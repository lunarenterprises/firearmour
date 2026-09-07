var model = require("../model/addevents");
var formidable = require("formidable");
var fs = require("fs");

module.exports.AddEvents = async (req, res) => {
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
            console.log(files.image);
            var { ev_name } = fields
            if (!ev_name) {
                return res.send({
                    result: false,
                    message: "insufficent parameter"
                })
            }

            if (files) {
                var oldPath = files.image.filepath;
                var newPath =
                    process.cwd() +
                    "/uploads/events/" +
                    files.image.originalFilename;
                let rawData = fs.readFileSync(oldPath);
                fs.writeFile(newPath, rawData, async function (err) {
                    if (err) console.log(err);
                    let imagepath =
                        "uploads/events/" + files.image.originalFilename;
                    let AddEvents = await model.AddEventQuery(ev_name, imagepath)
                    console.log(AddEvents.insertId, "Addevents");

                })
                return res.send({
                    result: true,
                    message: "event added successfully"
                });

            } else {
                return res.send({
                    result: true,
                    message: "failed to add event"
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