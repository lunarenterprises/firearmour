var model = require("../model/listserviceenquiry");


module.exports.ListServiceEnquiry = async (req, res) => {
    try {

        let lisserviceenquiry = await model.ListServiceEnquiryQuery();

        if (lisserviceenquiry.length > 0) {
            return res.send({
                result: true,
                message: "Data retrived",
                list: lisserviceenquiry
            });
        } else {
            return res.send({
                result: false,
                message: "data not found",
            });
        }
    } catch (error) {

        return res.send({
            result: false,
            message: error.message,
        });


    }
}