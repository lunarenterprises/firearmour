
var db = require('../db/db');
var util = require('util');
const query = util.promisify(db.query).bind(db);

module.exports.AddCategoryQuery = async (category) => {
    var Query = `insert into category (cg_name) values (?)`;
    var data = await query(Query, [category]);
    return data;
}