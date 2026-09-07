var db = require('../db/db');
var util = require('util');
const query = util.promisify(db.query).bind(db)

module.exports.InsertContactQuery = async (name, email, message) => {
    var Query = `insert into contactus (c_name,c_email,c_message) values (?,?,?)`;
    var data = await query(Query, [name, email, message])
    return data;
}