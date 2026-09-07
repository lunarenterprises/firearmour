
var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListPRoductsQuery = async (condition) => {
    var Query = `select * from products ${condition} ORDER BY p_id DESC`;
    var data = await query(Query);
    return data;

}

module.exports.GetCategory = async (cat_id) => {
    var Query = `select * from category where cg_id =? `;
    var data = await query(Query, [cat_id]);
    return data;

}