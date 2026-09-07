var nodemailer = require("nodemailer");
var model = require('../model/serviceenquiry');

module.exports.ServiceEnquiry = async (req, res) => {
  var { name, place, phone, service, message } = req.body;
  if (!name || !place || !phone || !service) {
    return res.send({
      result: false,
      message: "insufficient parameters",
    });
  }
  if (message) {
    var usermessage = message;

  } else {
    var usermessage = "no message";
  }
  let insertservice = await model.InsertServiceQuery(name, place, phone, service, usermessage)
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 587,
    auth: {
      type: 'custom',
      method: 'PLAIN',
      user: 'noreply@kdpdwct.org',
      pass: 'noreply@Kdpdwct2024',
    },
  });

  let data = [
    {
      email: 'jaisonroy700@gmail.com',
      subject: `New Enquiry From : ${name}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Service Inquiry</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #3E8E41;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      line-height: 1.6;
      font-size: 16px;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 10px 20px;
      text-align: center;
      font-size: 14px;
      color: #777;
    }
    .footer a {
      color: #3E8E41;
      text-decoration: none;
    }
    .button {
      background-color: #3E8E41;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      display: inline-block;
    }
    .button:hover {
      background-color: #357a33;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Service Inquiry</h1>
    </div>
    <div class="content">
      <p>Hello sir,</p>
      <p>You have received a new service enquiry from a customer. Below are the details:</p>
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="font-weight: bold;">Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Phone:</td>
          <td>${phone}</td>
        </tr>
         <tr>
          <td style="font-weight: bold;">Place:</td>
          <td>${place}</td>
        </tr>
         <tr>
          <td style="font-weight: bold;">Service:</td>
          <td>${service}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Message:</td>
          <td>${usermessage}</td>
        </tr>
      </table>
      <p>Please review the inquiry and get back to the customer as soon as possible.</p>
    </div>
    <div class="footer">
      <p>© 2024 KANNUR DISTRICT PETROLEUM DEALERS WELFEARE AND CHARITABLE TRUST. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`
    }]


  data.forEach(async (el) => {
    let infos = await transporter.sendMail({
      from: "KANNUR DISTRICT PETROLEUM <noreply@kdpdwct.org>",
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
