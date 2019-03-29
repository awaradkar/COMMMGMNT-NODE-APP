// Accessing the Service that we just created

var CommodityService = require('../services/commodity.services');
// Saving the context of this module inside the _the variable

_this = this

//console.log("Inside commodity controller route:"+CommodityService);

// Async Controller function to get the Commodity List

exports.getCommodities = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside commodity controller getCommodities:" + req);
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var commodities = await CommodityService.getCommodities({}, page, limit)

        // Return the Commodity list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: commodities, message: "Succesfully Commodities Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getCommodity = async function (req, res, next) {

    var commodityId = req.params.id;
    try {
        var commodity = await CommodityService.getCommodity(commodityId);
        return res.status(200).json({ status: 200, data: commodity, message: "Succesful in finding commodity" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createCommodity = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var commodity = {
        _commId: req.body._commId,
        _commName: req.body._commName,
        _description: req.body._description,
        _createdBy: req.body._createdBy,
        _unitOfMeasure: req.body._unitOfMeasure
    }

    try {

        // Calling the Service function with the new object from the Request Body

        var createdComm = await CommodityService.createCommodity(commodity)
        return res.status(201).json({ status: 201, data: createdComm, message: "Succesfully Created Commodity" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Commodity Creation was Unsuccesfull" })
    }
}

exports.updateCommodity = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var id = req.body._id;

    console.log(req.body)

    var commodity = {
        id,
        _commId: req.body._commId ? req.body._commId : null,
        _commName: req.body._commName ? req.body._commName : null,
        _description: req.body._description ? req.body._description : null,
        _modifiedBy: req.body._modifiedBy ? req.body._modifiedBy : null,
        _unitOfMeasure: req.body._unitOfMeasure ? req.body._unitOfMeasure : null
    }

    try {
        var updatedComm = await CommodityService.updateComm(commodity)
        return res.status(200).json({ status: 200, data: updatedComm, message: "Succesfully Updated Commodity" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeCommodity = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await CommodityService.deleteComm(id)
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully Commodity Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}