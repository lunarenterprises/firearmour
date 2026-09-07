var db = require('../db/db');
var util = require("util");
const query = util.promisify(db.query).bind(db);


module.exports.AddProductQuery = async (name, category, imagepath, price, description, stocks) => {
    var Query = `insert into products (p_name,p_cg_id,p_image,p_price,p_description,p_stocks) values (?,?,?,?,?,?)`;
    var data = query(Query, [name, category, imagepath, price, description, stocks]);
    return data;
}

module.exports.CheckProduct = async (name) => {
    console.log(name.toLowerCase());
    var Query = `select * from products where lower(p_name)=?`;
    var data = query(Query, [name.toLowerCase()]);
    return data;
};