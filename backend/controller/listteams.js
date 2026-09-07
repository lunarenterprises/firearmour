var model = require("../model/listteams");


module.exports.ListTeams = async (req, res) => {
    try {
        let t_id = req.body.t_id;
        var condition = ""
        if (t_id) {
            condition = `where t_id = '${t_id}'`
        }
        let listteams = await model.ListTeamQuery(condition);

        if (listteams.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: listteams
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