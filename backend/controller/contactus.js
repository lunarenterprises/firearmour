var model = require('../model/contactus');
var nodemailer = require("nodemailer");


module.exports.ContactUs = async (req, res) => {
    var { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.send({
            result: false,
            message: "insufficient parameters",
        });
    }
    let insertcontact = await model.InsertContactQuery(name, email, message)
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

    let data = [{
        email: email,
        subject: "MESSAGE FROM FIREARMOUR PROVISIONS",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us </title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thank You for Contacting Us!</h1>
        <p>Dear ${name},</p>
        <p>We appreciate your message and will get back to you as soon as possible. Your feedback is important to us!</p>
        

        <div class="footer">
            <p>Thank you!</p>
            <p> FIREARMOUR PROVISIONS</p>
        </div>
    </div>
</body>
</html>
`
    },
    {
        email: 'umeshudayan1996@gmail.com',
        subject: `New Enquiry From : ${name}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Us Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9em;
            color: #555;
        }
        .highlight {
            background-color: #e9ecef;
            padding: 10px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>New Contact Us Submission</h1>
        <p>You have received a new message from the contact form from the website.</p>

        <h2>User Details:</h2>
        <div class="highlight">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>

        <div class="footer">
            <p>Thank you for your attention!</p>
            <p> FIREARMOUR PROVISIONS</p>
        </div>
    </div>
</body>
</html>
`
    }]


    data.forEach(async (el) => {
        let infos = await transporter.sendMail({
            from: " FIREARMOUR PROVISIONS<support@choiceglobal.in>",
            to: el.email,
            subject: el.subject,
            html: el.html
        });
        nodemailer.getTestMessageUrl(infos);

    });


    return res.send({
        status: true,
        message: "mail sent",
    });
};
