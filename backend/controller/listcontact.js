var model = require("../model/listcontact");


module.exports.ListContacts = async (req, res) => {
    try {
        let c_id = req.body.c_id;
        var condition = ""
        if (c_id) {
            condition = `where c_id = '${c_id}'`
        }
        let listcontact = await model.ListContactQuery(condition);

        if (listcontact.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: listcontact
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