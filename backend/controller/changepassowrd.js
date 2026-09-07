var model = require('../model/changepassowrd');
var bcrypt = require("bcrypt");

module.exports.ChangePassword = async (req, res) => {
    try {

        var email = req.body.email;
        var password = req.body.password;

        if (!email || !password) {
            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        var hashedPassword = await bcrypt.hash(password, 10);
        let updatepassword = await model.UpdatePassword(hashedPassword, email);
        if (updatepassword) {
            return res.send({
                result: true,
                message: "Password Updated"
            })
        } else {
            return res.send({
                result: false,
                message: "failed to update password"
            })
        }

    } catch (error) {
        return res.send({
            result: false,
            mesage: error.message
        })

    }
}