var express = require("express");
var cors = require("cors");
var app = express();
var bodyparser = require("body-parser");
var https = require("https")
var http = require('http')
const fs = require('fs');
require('dotenv').config({ encoding: 'latin1' })
var privateKey = fs.readFileSync('/etc/ssl/private.key', 'utf8').toString();

var certificate = fs.readFileSync('/etc/ssl/certificate.crt', 'utf8').toString();

var ca = fs.readFileSync('/etc/ssl/ca_bundle.crt').toString();

var options = { key: privateKey, cert: certificate, ca: ca };

var server = https.createServer(options, app);
// var server = http.createServer(app);
app.use(
    bodyparser.urlencoded({
        extended: false,
    })
);
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('./'));
var mainRoute = require("./router");
app.use("/firearmourprovisions", mainRoute);

server.listen(6021, () => {
    console.log("server running on port 6021");
});