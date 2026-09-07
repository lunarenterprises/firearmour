var model = require("../model/deletesection");

module.exports.DeleteSection = async (req, res) => {

    try {
        var t_id = req.body.t_id;
        var c_id = req.body.c_id;
        var p_id = req.body.p_id;
        var se_id = req.body.se_id;
        var category_id = req.body.category_id;

        if (p_id) {
            var deletesection = await model.RemoveproductQuery(p_id);
        }
        if (t_id) {
            var deletesection = await model.RemoveteamQuery(t_id);
        }
        if (c_id) {
            var deletesection = await model.RemovecontactQuery(c_id);
        }
        if (se_id) {
            var deletesection = await model.RemoveserviceenquiryQuery(se_id);
        }
        if (category_id) {
            var deletesection = await model.RemoveCategoryQuery(category_id);
        }
        if (deletesection.affectedRows > 0) {
            return res.send({
                result: true,
                message: "delete successfully"
            })
        } else {
            return res.send({
                result: false,
                message: "failed to delete"
            })
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })

    }

}