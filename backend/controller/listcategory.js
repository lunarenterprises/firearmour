var model = require("../model/listcategory");


module.exports.ListCategory = async (req, res) => {
    try {

        let listCategory = await model.ListCategoryQuery();

        if (listCategory.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: listCategory
            });
        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}