var model = require("../model/listevents");


module.exports.ListEvents = async (req, res) => {
    try {
        let ev_id = req.body.ev_id;
        var condition = ""
        if (ev_id) {
            condition = `where ev_id = '${ev_id}'`
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