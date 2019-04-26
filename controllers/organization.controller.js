// Accessing the Service that we just created

var OrganizationService = require('../services/organization.service');
// Saving the context of this module inside the _the variable

_this = this

// Async Controller function to get the Organization List

exports.getOrganizations = async function (req, res, next) {

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    console.log("Inside organization controller getOrganizations:" + req);
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100;

    try {

        var organizations = await OrganizationService.getOrganizations(req.query, page, limit)

        // Return the Commodity list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({ status: 200, data: organizations, message: "Succesfully organizations Recieved" });

    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.getOrganization = async function (req, res, next) {

    var orgId = req.params.id;
    try {
        var organization = await OrganizationService.getOrganization(orgId);
        return res.status(200).json({ status: 200, data: organization, message: "Succesful in finding organization" });
    }
    catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createOrganization = async function (req, res, next) {

    // Req.Body contains the form submit values.

    var organization = req.body;

    try {
        // Calling the Service function with the new object from the Request Body
        var createdOrg = await OrganizationService.createOrganization(organization);
        return res.status(201).json({ status: 201, data: createdOrg, message: "Succesfully Created Organization" })
    } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({ status: 400, message: "Organization Creation was Unsuccesfull" })
    }
}

exports.updateOrg = async function (req, res, next) {

    // Id is necessary for the update

    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "Id must be present" })
    }

    var organization = req.body;
    console.log(organization);
    try {
        var updatedOrg = await OrganizationService.updateOrg(organization)
        return res.status(200).json({ status: 200, data: updatedOrg, message: "Succesfully Updated Organization" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.removeOrg = async function (req, res, next) {

    var id = req.params.id;

    try {
        var deleted = await OrganizationService.deleteOrg(id)
        return res.status(200).json({ status: 200, data: deleted, message: "Succesfully Organization Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }

}