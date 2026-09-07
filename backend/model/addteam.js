var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.CheckTeam = async (name) => {
    var Query = `select * from teamsection where lower(t_name)= ?`;
    var data = query(Query, [name.toLowerCase()]);
    return data;
};

module.exports.AddTeamMemberQuery = async (name, designation, image) => {
    var Query = `insert into teamsection (t_name,t_designation,t_image) values (?,?,?)`;
    var data = query(Query, [name, designation, image]);
    return data;
};