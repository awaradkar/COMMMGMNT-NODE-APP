// Gettign the Newly created Mongoose Model we just created 

var CommPack = require("../models/commodityPacks.model");
var PackService = require("../services/pack.service");
var promise = require('promise');
// Saving the context of this module inside the _the variable
_this = this

//console.log("Inside Pack service route:"+Commodity);
// Async function to get the Packs List

exports.getCommodityPacks = async function (query, page, limit) {

    // Options setup for the mongoose paginate      
    console.log("Inside getCommodityPacks");
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var commPacks = await CommPack.paginate(query, options)

        // Return the commPack list that was retured by the mongoose promise

        return commPacks;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating CommPacks')
    }
}

exports.getCommPack = async function (id) {

    //  Check for id   
    console.log("Inside getCommPack for id:" + id);
    var packDetails = new Array();
    try {
        var commPack = await CommPack.findOne({ _commId: id });
        console.log(commPack);

        if (commPack == null) {
            throw Error("CommPack not found")
        }

        return commPack;
    } catch (e) {
        throw Error("Error Occured while Fetching the CommPack")
    }
}

exports.getPackMap = async function (id) {

    //  Check for id   
    console.log("Inside getCommPack for id:" + id);
    var packDetails = new Array();
    var arr = [];arr.push(id);
    try {
        var commPack = await CommPack.find({ _packs: { $all: arr } });
        console.log(commPack);

        if (commPack == null) {
            throw Error("CommPack not found")
        }

        return commPack;
    } catch (e) {
        throw Error("Error Occured while Fetching the CommPack")
    }
}

exports.createCommPack = async function (commPack) {

    // Creating a new Mongoose Object by using the new keyword

    var newCommPack = new CommPack({
        _commId: commPack._commId,
        _packs: commPack._packs,
        _createdDate: new Date(),
        _createdBy: commPack._createdBy
    })


    try {
        var savedCommPack = await newCommPack.save();
        return savedCommPack;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Mapping Comm Packs")
    }
}

exports.updateCommPack = async function (commPack) {
    var id = commPack._id
    console.log(id);
    try {
        //Find the old CommodityPack Object by the Id

        var oldCommPack = await CommPack.findById(id);
        console.log(oldCommPack);

    } catch (e) {
        console.log(e);
        throw Error("Error occured while Finding the Commodity Pack")
    }

    // If no old Comm Pack Object exists return false

    if (!oldCommPack) {
        return false;
    }

    console.log(oldCommPack)

    //Edit the Pack Object
    oldCommPack._packs = commPack._packs,
        oldCommPack._modifiedDate = new Date(),
        oldCommPack._modifiedBy = commPack._modifiedBy,

        console.log(oldCommPack)

    try {
        var savedCommPack = await oldCommPack.save()
        return savedCommPack;
    } catch (e) {
        throw Error("And Error occured while updating the Commodity Pack");
    }
}

exports.deleteCommPack = async function (id) {

    // Delete the Commodity Pack
    console.log(id);

    try {
        var deleted = await CommPack.deleteOne({ _id: id })
        console.log(deleted);

        if (deleted.deletedCount == 0) {
            throw Error("Comm Pack Could not be delete")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Comm Pack")
    }
}

exports.getPackDetails = async function (packs) {
    console.log(packs);
    var packDetails = [];

    for (const item of packs) {
        var packObj = await PackService.getPack(item);
        packDetails.push(packObj)
    }
    console.log("packDtls:" + packDetails);
    return packDetails;
}