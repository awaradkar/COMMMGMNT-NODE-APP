// Accessing the Service that we just created

var WareCommService = require('../services/wareCommMap.service');
// Saving the context of this module inside the _the variable

_this = this

// Async Controller function to get the Commodity Pack List

exports.getWareCommMaps = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside packs controller getCommPacks:" + req);
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var wareCommMaps = await WareCommService.getWareCommMaps(req.query, page, limit)

        // Return the Warehouse Commodity Maps list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: wareCommMaps, message: "Succesfully Warehouse Commodity Maps Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getWareCommMap = async function (req, res, next) {

    var ware = req.params.id;
    try {
        var wareCommMap = await WareCommService.getWareCommMap(ware);
        console.log("......................." + wareCommMap);
        var commDtls = await WareCommService.getCommDetails(wareCommMap._commId);
        var wareCommMapDtls = new Object({ wareComm: wareCommMap, commodityDtls: commDtls });
        return res.status(200).json({ status: 200, data: wareCommMapDtls, message: "Succesful in finding WareCommMap" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createWareCommMap = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var wareCommMap = req.body;

    try {
        // Calling the Service function with the new object from the Request Body
        var createdWareCommMap = await WareCommService.createWareCommMap(wareCommMap);
        return res.status(201).json({ status: 201, data: createdWareCommMap, message: "Succesfully Created Warehouse Commodity Map" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Warehuse Commodity Map Creation was Unsuccesfull" })
    }
}

exports.updateWareCommMap = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var wareCommMap = req.body;

    try {
        var updatedWareCommMap = await WareCommService.updateWareCommMap(wareCommMap)
        return res.status(200).json({ status: 200, data: updatedWareCommMap, message: "Succesfully Updated Warehouse Comm map" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeWareCommMap = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await WareCommService.deleteWareCommMap(id)
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully Deleted the Warehouse Commodity Map" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}