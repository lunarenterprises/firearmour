var db = require("../db/db");
var util = require("util")
const query = util.promisify(db.query).bind(db);

module.exports.CheckEmailQuery = async (email) => {
    var Query = `select * from admin where ad_email = ?`;
    var data = await query(Query, [email]);
    return data;
};

module.exports.CheckFpEmail = async (email) => {
    var Query = `select * from forgot_password where fp_email = ?  `;
    var data = await query(Query, [email]);
    return data;
};
module.exports.UpdateFpEmail = async (email, OTP, expirationDate) => {
    var Query = `UPDATE forgot_password SET fp_otp = ?, fp_otp_expiry = ?,otp_status='unverified' WHERE fp_email = ?`;
    var data = await query(Query, [OTP, expirationDate, email]);
    return data;
};

module.exports.AddForgotDetails = async (email, OTP, expirationDate) => {
    var Query = `insert into forgot_password (fp_email,fp_otp,fp_otp_expiry) values (?,?,?) `;
    var data = await query(Query, [email, OTP, expirationDate]);
    return data;
}