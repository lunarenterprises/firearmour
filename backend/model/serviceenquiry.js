var db = require('../db/db');
var util = require('util');
const query = util.promisify(db.query).bind(db)

module.exports.InsertServiceQuery = async (name, place, phone, service, message) => {
    var Query = `insert into service_enquiry (se_name,se_place,se_phone,se_service,se_message) values (?,?,?,?,?)`;
    var data = await query(Query, [name, place, phone, service, message])
    return data;
}