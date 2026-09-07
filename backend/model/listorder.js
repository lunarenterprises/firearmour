var db = require("../db/db");
var util = require("util");
const query = util.promisify(db.query).bind(db);

module.exports.ListOrderQuery = async () => {
    var Query = `SELECT * FROM orders ORDER BY od_id DESC`;
    var data = query(Query);
    return data;

}

module.exports.OrderProductList = async (order_id) => {
    var Query = `SELECT * FROM order_product
    INNER JOIN products ON products.p_id = order_product.op_product_id
    WHERE order_product.op_order_id = ? `;
    var data = query(Query, [order_id]);
    return data;

}