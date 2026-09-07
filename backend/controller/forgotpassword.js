var model = require('../model/forgotpassword');
var nodemailer = require('nodemailer');
var moment = require('moment')


module.exports.ForgotPassword = async (req, res) => {
    try {

        var email = req.body.email;
        if (!email) {
            return res.send({
                return: false,
                message: "insufficent parameters"
            })
        }

        OTP = generate4DigitNumber()
        var expirationDate = moment().add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss');

        var checkfpmail = await model.CheckFpEmail(email);

        if (checkfpmail.length > 0) {
            var addforgetdetails = await model.UpdateFpEmail(email, OTP, expirationDate)
        } else {
            var addforgetdetails = await model.AddForgotDetails(email, OTP, expirationDate);

        }


        if (addforgetdetails.affectedRows > 0) {


            let transporter = nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 587,
                auth: {
                    type: 'custom',
                    method: 'PLAIN',
                    user: 'support@choiceglobal.in',
                    pass: 'support123abcAB@',
                },
            });


            let infos = await transporter.sendMail({
                from: "FIREARMOUR PROVISIONS <support@choiceglobal.in>",
                to: email,
                subject: "one time OTP",
                html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #1a73e8;
        }
        .message {
            margin-top: 20px;
            color: #555;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h2>Your OTP Code</h2>
        <p>Dear User,</p>
        <p>Your OTP (One-Time Password) for verification is:</p>
        <p class="otp">${OTP}</p>
        <p class="message">Please enter this code in the application to verify your email address. The code is valid for 10 minutes.</p>
        <div class="footer">
            <p>If you did not request this OTP, please ignore this email or contact support.</p>
            <p>Thank you!</p>
        </div>
    </div>
</body>
</html>
`
            });
            nodemailer.getTestMessageUrl(infos);


            return res.send({
                result: true,
                message: "OTP Added Successfully "
            })
        } else {
            return res.send({
                result: false,
                message: "failed to add OTP"
            })
        }

    } catch (error) {
        return res.send({
            result: false,
            message: error.message
        })
    }
}

function generate4DigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}