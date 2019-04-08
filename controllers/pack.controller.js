// Accessing the Service that we just created

var PackService = require('../services/pack.service');
// Saving the context of this module inside the _the variable

_this = this

// Async Controller function to get the Pack List

exports.getPacks = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside packs controller getPacks:" + req);
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var packs = await PackService.getPacks({}, page, limit)

        // Return the Pack list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: packs, message: "Succesfully Packs Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getPack = async function (req, res, next) {

    var packType = req.params.id;
    try {
        var pack = await PackService.getPack(packType);
        return res.status(200).json({ status: 200, data: pack, message: "Succesful in finding pack" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createPack = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var pack = req.body;

    try {
        // Calling the Service function with the new object from the Request Body
        var createdPack = await PackService.createPack(pack);
        return res.status(201).json({ status: 201, data: createdPack, message: "Succesfully Created Pack" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Pack Creation was Unsuccesfull" })
    }
}

exports.updatePack = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var pack = req.body;

    try {
        var updatedPack = await PackService.updatePack(pack)
        return res.status(200).json({ status: 200, data: updatedPack, message: "Succesfully Updated Pack" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removePack = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await PackService.deletePack(id)
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully Deleted the Pack" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}