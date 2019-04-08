// Accessing the Service that we just created

var CommPackService = require('../services/commodityPacks.service');
// Saving the context of this module inside the _the variable

_this = this

// Async Controller function to get the Commodity Pack List

exports.getCommPacks = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside packs controller getCommPacks:" + req);
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var commPacks = await CommPackService.getCommodityPacks({}, page, limit)

        // Return the Commodity Pack list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: commPacks, message: "Succesfully Commodity Packs Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getCommPack = async function (req, res, next) {

    var comm = req.params.id;
    try {
        var pack = await CommPackService.getCommPack(comm);
        console.log("......................."+pack);
        var packDtls = await CommPackService.getPackDetails(pack._packs);
        var commPackWithDetails = new Object({ commPack: pack, packDetails: packDtls });
        return res.status(200).json({ status: 200, data: commPackWithDetails, message: "Succesful in finding Commpack" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createCommPack = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var commPack = req.body;

    try {
        // Calling the Service function with the new object from the Request Body
        var createdCommPack = await CommPackService.createCommPack(commPack);
        return res.status(201).json({ status: 201, data: createdCommPack, message: "Succesfully Created Commodity Pack" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Commodity Pack Creation was Unsuccesfull" })
    }
}

exports.updateCommPack = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var commPack = req.body;

    try {
        var updatedCommPack = await CommPackService.updateCommPack(commPack)
        return res.status(200).json({ status: 200, data: updatedCommPack, message: "Succesfully Updated Comm Pack" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeCommPack = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await CommPackService.deleteCommPack(id)
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully Deleted the Commodity Pack" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}