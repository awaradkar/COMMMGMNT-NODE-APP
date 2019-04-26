// Gettign the Newly created Mongoose Model we just created 

var Commodity = require("../models/commodity.model");
var IdGeneratorService = require("../services/idGenerator.service");

// Saving the context of this module inside the _the variable
_this = this

//console.log("Inside commodity service route:"+Commodity);
// Async function to get the Commodity List

exports.getCommodities = async function (query, page, limit) {

    // Options setup for the mongoose paginate      
    console.log("Inside getCommodities:" + JSON.stringify(query));
    var options = {
        page,
        limit
    }

    var obj = null;
    try {
        obj = await queryObject(query);
        console.log(obj);
        var commodities = await Commodity.paginate(obj, options);
        // Return the commodity list that was retured by the mongoose promise

        return commodities;

    } catch (e) {

        // return a Error message describing the reason 
        console.log(e);
        throw Error('Error while Paginating Commodities')
    }
}

exports.getCommodity = async function (id) {

    //  Check for id   
    console.log("Inside getCommodity for id:" + id);
    try {
        var commodity = await Commodity.findOne({ _commId: id });
        console.log(commodity);

        if (commodity == null) {
            throw Error("Commodity not found")
        }
        return commodity;
    } catch (e) {
        console.log(e);
        throw Error("Error Occured while Fetching the Commodity")
    }
}

exports.createCommodity = async function (commodity) {

    // Creating a new Mongoose Object by using the new keyword
    var commodityId = await IdGeneratorService.getId("COMM");
    var newCommodity = new Commodity({
        _commId: commodityId,
        _commName: commodity._commName,
        _description: commodity._description,
        _createdDate: new Date(),
        _modifiedDate: "",
        _createdBy: commodity._createdBy,
        _modifiedBy: "",
        _unitOfMeasure: commodity._unitOfMeasure
    })

    try {

        // Saving the Commodity 

        var savedCommodity = await newCommodity.save();

        return savedCommodity;
    } catch (e) {

        // return a Error message describing the reason     

        throw Error("Error while Creating Commodity")
    }
}

exports.updateComm = async function (commodity) {
    var id = commodity.id
    console.log(id);
    try {
        //Find the old Commodity Object by the Id

        var oldComm = await Commodity.findById(id);
        console.log(oldComm);

    } catch (e) {
        console.log(e);
        throw Error("Error occured while Finding the Commodity")
    }

    // If no old Commodity Object exists return false

    if (!oldComm) {
        return false;
    }

    console.log(oldComm)

    //Edit the Commodity Object

    oldComm._commId = commodity._commId,
        oldComm._commName = commodity._commName,
        oldComm._description = commodity._description,
        oldComm._modifiedDate = new Date(),
        oldComm._modifiedBy = commodity._modifiedBy,
        oldComm._unitOfMeasure = commodity._unitOfMeasure

    console.log(oldComm)

    try {
        var savedComm = await oldComm.save()
        return savedComm;
    } catch (e) {
        throw Error("And Error occured while updating the Commodity");
    }
}

exports.deleteComm = async function (id) {

    // Delete the Commodity
    console.log(id);

    try {
        var deleted = await Commodity.deleteOne({ _id: id })
        console.log(deleted);

        if (deleted.deletedCount == 0) {
            throw Error("Commodity Could not be delete")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the commodities")
    }
}

exports.getCommAutoComplete = async function (query, limit) {

    // Options setup for the mongoose paginate      
    console.log("Inside getCommAutoComplete:" + JSON.stringify(query));
    var commodities = [];
    try {
        
        if (query._comm != null) {
            var str = "(?i)"+query._comm;
            commodities = await Commodity.find(
                {$or:[{_commName:{ $regex: str }},{_commId:{ $regex: str }}]},{ _commId: 1, _commName: 1, _id: 0 }).sort({_commName:1}).limit(limit);
        }
        
        
        // Return the commodity list that was retured by the mongoose promise

        return commodities;

    } catch (e) {

        // return a Error message describing the reason 
        console.log(e);
        throw Error('Error while Fetching Commodity for AutoComplete')
    }
}

function queryObject(query){
    var obj = null;
    if (query._commId != null || query._commName != null || query.startDate != null || query.endDate != null) {
        obj = {};
    };
    if (query._commId != null) {
        obj._commId = query._commId;
    }
    if (query._commName != null) {
        var str = "(?i)"+query._commName;
        obj._commName = { $regex: str } ;
    }

    if (query.startDate != null) {
        obj._createdDate = { $gte: new Date(query.startDate) };
    }
    if (query.endDate != null) {
        obj._createdDate = { $lte: new Date(query.endDate) };
    }
    return obj;
}