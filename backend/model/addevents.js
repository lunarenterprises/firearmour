var db = require('../db/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.AddEventQuery = async (ev_name, imagepath) => {
    var Query = `insert into events (ev_name,ev_image) values (?,?)`;
    var data = query(Query, [ev_name, imagepath]);
    return data;
}