var model = require('../model/verifyotp');
var moment = require('moment')

module.exports.VerifyOtp = async (req, res) => {
    try {

        var email = req.body.email;
        var OTP = req.body.OTP;

        if (!email || !OTP) {
            return res.send({
                result: false,
                message: "insufficent parameter"
            })
        }
        let checkotp = await model.CheckOTP(email, OTP);

        if (checkotp.length > 0) {
            let otpinfo = await model.ValidateResetToken(email, OTP);

            const otpexpiry = moment(otpinfo[0].fp_otp_expiry)

            const date = moment().isAfter(otpexpiry);

            if (!otpinfo || date == true) {
                return res.send({
                    result: false,
                    message: "OTP expired,Please resend OTP"
                })
            } else {
                let checkverifiedotp = await model.CheckVerifiedOtp(email, OTP)
                if (checkverifiedotp[0].otp_status == 'unverified') {


                    let verifiedotp = await model.VerifiedOtp(email, OTP)
                    if (verifiedotp) {
                        return res.send({
                            result: true,
                            message: "OTP verified"
                        })

                    }

                } else {
                    return res.send({
                        result: false,
                        message: "otp expired try again"
                    })
                }
            }
        } else {
            return res.send({
                result: false,
                message: "invalid otp or email"
            })
        }
    } catch (error) {
        return res.send({
            result: false,
            mesage: error.message
        })

    }
}