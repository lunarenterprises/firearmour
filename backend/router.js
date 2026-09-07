var express = require("express");
var route = express.Router();
var { VerifyToken } = require('./componets/jwt')

var { AdminLogin } = require('./controller/adminlogin')
route.post('/admin/login', AdminLogin)

var { ContactUs } = require('./controller/contactus')
route.post('/contact-us', ContactUs)

var { ListContacts } = require('./controller/listcontact')
route.post('/list/contactus', ListContacts)

// var { AddEvents } = require('./controller/addevents')
// route.post('/add/events', AddEvents)

// var { ListEvents } = require('./controller/listevents')
// route.post('/list/events', ListEvents)

var { AddProducts } = require('./controller/addproducts')
route.post('/add/product', AddProducts)

var { EditProduct } = require('./controller/editproduct')
route.post('/edit/product', EditProduct)

var { ListProducts } = require('./controller/listproducts')
route.post('/list/products', ListProducts)

var { AddTeamMember } = require('./controller/addteam')
route.post('/add/team-member', AddTeamMember)

var { ListTeams } = require('./controller/listteams')
route.post('/list/team-member', ListTeams)

var { EditTeam } = require('./controller/editteam')
route.post('/edit/team-member', EditTeam)

var { DeleteSection } = require('./controller/deletesection')
route.post('/delete', DeleteSection)

var { ForgotPassword } = require('./controller/forgotpassword')
route.post('/forgot-password', ForgotPassword)

var { VerifyOtp } = require('./controller/verifyotp')
route.post('/verify-otp', VerifyOtp)

var { ChangePassword } = require('./controller/changepassowrd')
route.post('/change-password', ChangePassword)

var { AddOrder } = require('./controller/addorder')
route.post('/add-order', AddOrder)

var { ListOrder } = require('./controller/listorder')
route.post('/list-order', ListOrder)

var { AddCategory } = require('./controller/addcategory')
route.post('/add/category', AddCategory)

var { ListCategory } = require('./controller/listcategory')
route.post('/list/category', ListCategory)

var { ServiceEnquiry } = require('./controller/serviceenquiry')
route.post('/service-enquiry', ServiceEnquiry)

var { ListServiceEnquiry } = require('./controller/listserviceenquiry')
route.post('/list/service-enquiry', ListServiceEnquiry)

module.exports = route;