var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.UpdatePassword = async (password, email) => {
    var Query = `update admin set ad_password=? where ad_email =? `;
    var data = await query(Query, [password, email]);
    return data;
}