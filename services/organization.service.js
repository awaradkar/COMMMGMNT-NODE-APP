// Gettign the Newly created Mongoose Model we just created 

var Organization = require("../models/organization.model");
// Saving the context of this module inside the _the variable
_this = this

//console.log("Inside Organization service route:"+Organization);
// Async function to get the Organization List

exports.getOrganizations = async function (query, page, limit) {

    // Options setup for the mongoose paginate      
    console.log("Inside getOrganizations");
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var organizations = await Organization.paginate(query, options)

        // Return the organizations list that was retured by the mongoose promise

        return organizations;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating organizations')
    }
}

exports.getOrganization = async function (id) {

    //  Check for id   
    console.log("Inside getOrganization for id:" + id);
    try {
        var organization = await Organization.findOne({ _orgId: id });
        console.log(organization);

        if (organization == null) {
            throw Error("Organization not found")
        }
        return organization;
    } catch (e) {
        throw Error("Error Occured while Fetching the organization")
    }
}

exports.createOrganization = async function (organization) {

    // Creating a new Mongoose Object by using the new keyword

    var newOrganization = new Organization({
        _orgId: organization._orgId,
        _orgName: organization._orgName,
        _orgType: organization._orgType,
        _orgAddress: organization._orgAddress,
        _orgLocation: organization._orgLocation,
        _orgCity: organization._orgCity,
        _orgZipCode: organization._orgZipCode,
        _orgState: organization._orgState,
        _orgDate: organization._orgDate,
        _createdBy: organization._createdBy,
        _createdDate: new Date(),
        _modifiedDate: "",
        _modifiedBy: ""
    })

    try {

        // Saving the Organization 

        var savedOrganization = await newOrganization.save();

        return savedOrganization;
    } catch (e) {

        // return a Error message describing the reason     

        throw Error("Error while Creating Organization")
    }
}

exports.updateOrg = async function (organization) {
    var id = organization._id
    console.log(id);
    try {
        //Find the old Commodity Object by the Id

        var oldOrg = await Organization.findById(id);
        console.log(oldOrg);

    } catch (e) {
        console.log(e);
        throw Error("Error occured while Finding the Organization")
    }

    // If no old Organization Object exists return false

    if (!oldOrg) {
        return false;
    }

    console.log(oldOrg)

    //Edit the Organization Object
        oldOrg._orgName = organization._orgName,
        oldOrg._orgAddress = organization._orgAddress,
        oldOrg._orgLocation = organization._orgLocation,
        oldOrg._orgCity = organization._orgCity,
        oldOrg._orgZipCode = organization._orgZipCode,
        oldOrg._orgState = organization._orgState,
        oldOrg._orgDate = organization._orgDate,
        oldOrg._modifiedDate = new Date(),
        oldOrg._modifiedBy = organization._modifiedBy

    console.log(oldOrg)

    try {
        var savedOrg = await oldOrg.save()
        return savedOrg;
    } catch (e) {
        throw Error("And Error occured while updating the Organization");
    }
}

exports.deleteOrg = async function (id) {

    // Delete the Commodity
    console.log(id);

    try {
        var deleted = await Organization.deleteOne({ _id: id })
        console.log(deleted);

        if (deleted.deletedCount == 0) {
            throw Error("Organization Could not be delete")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Organization")
    }
}