var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.CheckOTP = async (email, OTP) => {
    var Query = `select * from forgot_password where fp_email=? and fp_otp=?`;
    var data = await query(Query, [email, OTP]);
    return data;
}

module.exports.VerifiedOtp = async (email, OTP) => {
    var Query = `UPDATE forgot_password SET otp_status = 'verified' WHERE fp_email = ? AND fp_otp = ?`;
    var data = await query(Query, [email, OTP]);
    return data;
}

module.exports.CheckVerifiedOtp = async (email, OTP) => {
    var Query = `select * from forgot_password where fp_email =? and fp_otp =? `;
    var data = await query(Query, [email, OTP]);
    return data;
}

module.exports.ValidateResetToken = async (email, OTP) => {
    var Query = `select * from forgot_password where fp_email =? and fp_otp =? `;
    var data = await query(Query, [email, OTP]);
    return data;
};