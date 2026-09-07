
var model = require("../model/listproducts");


module.exports.ListProducts = async (req, res) => {
    try {
        let p_id = req.body.p_id;
        let category_id = req.body.category_id;

        var condition = ""
        if (p_id) {
            condition = `where p_id = '${p_id}'`
        }
        if (category_id) {
            condition = `where p_cg_id = '${category_id}'`
        }
        let listproducts = await model.ListPRoductsQuery(condition);

        var data = await Promise.all(
            listproducts.map(async (el) => {
                var cat_id = el.p_cg_id;
                let getcategory = await model.GetCategory(cat_id);

                // Check if getcategory is defined and has at least one element
                if (getcategory && getcategory.length > 0) {
                    console.log(getcategory[0].cg_name, "1111");
                    el.category = getcategory[0].cg_name;
                } else {
                    // If no category is found, handle it gracefully
                    el.category = "Unknown"; // Or some default value
                }
                return el;
            })
        );

        if (listproducts.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: data
            });
        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }
    } catch (error) {
        console.log(error);

        return res.send({
            result: false,
            message: error.message,
        });


    }
}