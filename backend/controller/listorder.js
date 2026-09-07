const { promises } = require("fs");
var model = require("../model/listorder");

module.exports.ListOrder = async (req, res) => {
    try {

        let Orderlist = await model.ListOrderQuery();
        var data = await Promise.all(
            Orderlist.map(async (el) => {
                const order_id = el.od_id;
                const orderproductlist = await model.OrderProductList(order_id);
                let products = [];

                orderproductlist.forEach(product => {
                    const productDetails = {
                        name: product.p_name,
                        quantity: product.op_quantity,
                        price: product.p_price,
                    };
                    products.push(productDetails);
                });
                el.OrderProducts = products;
                return el;
            })
        );

        if (Orderlist.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: data,
            });
        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }
    } catch (error) {
        console.log(error);

        return res.send({
            result: false,
            message: error.message,
        });


    }
}