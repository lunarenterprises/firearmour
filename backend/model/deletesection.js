var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.RemoveteamQuery = async (t_id) => {
    var Query = `DELETE FROM teamsection WHERE t_id=?`;
    var data = await query(Query, [t_id]);
    return data;
};
module.exports.RemovecontactQuery = async (c_id) => {
    var Query = `DELETE FROM contactus WHERE c_id=?`;
    var data = await query(Query, [c_id]);
    return data;
};
module.exports.RemoveproductQuery = async (p_id) => {
    var Query = `DELETE FROM products WHERE p_id=?`;
    var data = await query(Query, [p_id]);
    return data;
};
module.exports.RemoveserviceenquiryQuery = async (se_id) => {
    var Query = `DELETE FROM service_enquiry WHERE se_id=?`;
    var data = await query(Query, [se_id]);
    return data;
};
module.exports.RemoveCategoryQuery = async (category_id) => {
    var Query = `DELETE FROM category WHERE cg_id=?`;
    var data = await query(Query, [category_id]);
    return data;
};