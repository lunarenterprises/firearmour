var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListTeamQuery = async (condition) => {
    var Query = `select * from teamsection ${condition}`;
    var data = await query(Query);
    return data;

}