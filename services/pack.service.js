// Gettign the Newly created Mongoose Model we just created 

var Pack = require("../models/pack.model");
// Saving the context of this module inside the _the variable
_this = this

//console.log("Inside commodity service route:"+Pack);
// Async function to get the Packs List

exports.getPacks = async function (query, page, limit) {

    // Options setup for the mongoose paginate      
    console.log("Inside getPacks");
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var packs = await Pack.paginate(query, options)

        // Return the pack list that was retured by the mongoose promise

        return packs;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating Packs')
    }
}

exports.getPack = async function (id) {

    //  Check for id   
    console.log("Inside getPack for id:" + id);
    try {
        var pack = await Pack.findOne({ _packType: id });
        console.log(pack);

        if (pack == null) {
            throw Error("Pack not found")
        }
        return pack;
    } catch (e) {
        throw Error("Error Occured while Fetching the Pack")
    }
}

exports.createPack = async function (pack) {

    // Creating a new Mongoose Object by using the new keyword

    var newPack = new Pack({
        _packType: pack._packType,
        _packDescription: pack._packDescription,
        _packDeduction: pack._packDeduction,
        _createdDate: new Date(),
        _createdBy: pack._createdBy
    })

    console.log(newPack);
    try {
        var savedPack = await newPack.save();
        return savedPack;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating Packs")
    }
}

exports.updatePack = async function (pack) {
    var id = pack._id
    console.log(id);
    try {
        //Find the old Commodity Object by the Id

        var oldPack = await Pack.findById(id);
        console.log(oldPack);

    } catch (e) {
        console.log(e);
        throw Error("Error occured while Finding the Pack")
    }

    // If no old Pack Object exists return false

    if (!oldPack) {
        return false;
    }

    console.log(oldPack)

    //Edit the Pack Object
    oldPack._packDescription = pack._packDescription,
        oldPack._packDeduction = pack._packDeduction,
        oldPack._modifiedDate = new Date(),
        oldPack._modifiedBy = pack._modifiedBy,

        console.log(oldPack)

    try {
        var savedPack = await oldPack.save()
        return savedPack;
    } catch (e) {
        throw Error("And Error occured while updating the Pack");
    }
}

exports.deletePack = async function (id) {

    // Delete the Commodity
    console.log(id);

    try {
        var deleted = await Pack.deleteOne({ _id: id })
        console.log(deleted);

        if (deleted.deletedCount == 0) {
            throw Error("Pack Could not be delete")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Pack")
    }
}