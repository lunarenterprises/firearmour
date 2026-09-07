var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.CheckTeamQuery = async (t_id) => {
    var Query = `select * from teamsection where t_id= ?`;
    var data = query(Query, [t_id]);
    return data;
};

module.exports.ChangeTeam = async (condition, t_id) => {
    var Query = `update teamsection ${condition} where t_id = ?`;
    var data = query(Query, [t_id]);
    return data;
};
module.exports.Updateimage = async (image, t_id) => {
    var Query = `update teamsection set t_image = ?  where t_id = ? `;
    var data = query(Query, [image, t_id]);
    return data;
};
