// Accessing the Service that we just created

var CommodityService = require('../services/commodity.services');
var OrganizationService = require('../services/organization.service');
// Saving the context of this module inside the _the variable

_this = this

//console.log("Inside commodity controller route:"+CommodityService);

// Async Controller function to get the Commodity List

exports.getCommAutoComplete = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside autocomplete controller getCommAutoComplete:" + req);
    var limit = req.query.limit ? req.query.limit : 30;
    
    try {

        var commodityAuto = await CommodityService.getCommAutoComplete(req.query, limit)

        // Return the Commodity list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: commodityAuto, message: "Succesfully Commodities Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getOrgNameAutoComplete = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside autocomplete controller getOrgNameAutoComplete:" + req);
    var limit = req.query.limit ? req.query.limit : 30;
    
    try {

        var organizationName = await OrganizationService.getOrgNmAutoComplete(req.query, limit)

        // Return the Commodity list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: organizationName, message: "Succesfully Organization Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getOrgCityAutoComplete = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside autocomplete controller getOrgCityAutoComplete:" + req);
    var limit = req.query.limit ? req.query.limit : 30;
    
    try {

        var organizationCity = await OrganizationService.getOrgCityAutoComplete(req.query, limit)

        // Return the Commodity list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: organizationCity, message: "Succesfully Organization Cities Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}