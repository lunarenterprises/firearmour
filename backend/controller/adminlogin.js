var model = require("../model/adminlogin");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

module.exports.AdminLogin = async (req, res) => {
    try {

        let password = req.body.password;
        let email = req.body.email;
        var SECRET_KEY = "dkjghkdghfhglknghdxlkdnflsfjopoijoigjhpokp"
        if (
            !password || !email) {
            return res.send({
                result: false,
                message: "insufficient parameters",
            });
        }
        let CheckUser = await model.CheckadminQuery(email);
        console.log(CheckUser);

        if (CheckUser.length > 0) {
            let Checkpassword = await bcrypt.compare(
                password,
                CheckUser[0].ad_password
            );
            if (Checkpassword == true) {
                const payload = {
                    email: CheckUser[0].ad_email,
                    ad_id: CheckUser[0].ad_id
                };

                const token = jwt.sign(
                    payload,
                    SECRET_KEY,
                    {}
                );


                return res.send({
                    result: true,
                    message: "logged in successfully",
                    ad_id: CheckUser[0].ad_id,
                    ad_name: CheckUser[0].ad_name,
                    ad_email: CheckUser[0].ad_email,
                    user_token: token,

                })
            } else {
                return res.send({
                    result: false,
                    message: "incorrect password please check and try again",
                });
            }
        } else {
            return res.send({
                result: false,
                message: "email not registered with us",
            });
        }
    } catch (error) {
        return res.send({
            result: false,
            message: error.message,
        });
    }
};