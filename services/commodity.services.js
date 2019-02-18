// Gettign the Newly created Mongoose Model we just created 

var Commodity = require("../models/commodity.model");
// Saving the context of this module inside the _the variable
_this = this

//console.log("Inside commodity service route:"+Commodity);
// Async function to get the Commodity List

exports.getCommodities = async function(query, page, limit){

    // Options setup for the mongoose paginate      
    console.log("Inside getCommodities");
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var commodities = await Commodity.paginate(query, options)
        
        // Return the commodity list that was retured by the mongoose promise

        return commodities;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating Commodities')
    }
}

exports.createCommodity= async function(commodity){
    
    // Creating a new Mongoose Object by using the new keyword

    var newCommodity = new Commodity({
        _commId: commodity._commId,
        _commName: commodity._commName,
        _description: commodity._description,
        _createdDate: new Date(),
        _modifiedDate: "",
        _createdBy: commodity. _createdBy,
        _modifiedBy: "",
        _unitOfMeasure: commodity._unitOfMeasure  
    })

    try{

        // Saving the Commodity 

        var savedCommodity = await newCommodity.save();

        return savedCommodity;
    }catch(e){
      
        // return a Error message describing the reason     

        throw Error("Error while Creating Commodity")
    }
}

exports.updateComm =  async function(commodity){
    var id = commodity.id
    console.log(id);
    try{
        //Find the old Commodity Object by the Id
    
        var oldComm = await Commodity.findById(id);
        console.log(oldComm);
        
    }catch(e){
        console.log(e);
        throw Error("Error occured while Finding the Commodity")
    }

    // If no old Commodity Object exists return false

    if(!oldComm){
        return false;
    }

    console.log(oldComm)

    //Edit the Commodity Object

    oldComm._commId = commodity._commId,
    oldComm._commName= commodity._commName,
    oldComm._description= commodity._description,
    oldComm. _modifiedDate= new Date(),
    oldComm._modifiedBy= commodity._modifiedBy,
    oldComm._unitOfMeasure= commodity._unitOfMeasure

    console.log(oldComm)

    try{
        var savedComm = await oldComm.save()
        return savedComm;
    }catch(e){
        throw Error("And Error occured while updating the Commodity");
    }
}

exports.deleteComm = async function(id){
    
    // Delete the Commodity
    console.log(id);

    try{
        var deleted = await Commodity.deleteOne({_id: id})
        console.log(deleted);
        
        if(deleted.deletedCount==0){
            throw Error("Commodity Could not be delete")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the commodities")
    }
}