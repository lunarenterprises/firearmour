var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListServiceEnquiryQuery = async () => {
    var Query = `select * from service_enquiry ORDER BY se_id DESC`;
    var data = await query(Query);
    return data;

}