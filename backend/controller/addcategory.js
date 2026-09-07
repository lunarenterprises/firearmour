var model = require('../model/addcategory')

module.exports.AddCategory = async (req, res) => {

    try {
        let category = req.body.category;
        if (!category) {
            return res.send({
                result: false,
                message: "insufficient parameters",
            });
        }
        let AddCategory = await model.AddCategoryQuery(category);
        if (AddCategory.affectedRows == 0) {
            return res.send({
                result: false,
                message: "Category not added",
            });

        } else {
            return res.send({
                result: true,
                message: "Category added successfully",
            });
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message,
        });
    }
}
