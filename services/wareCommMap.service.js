// Gettign the Newly created Mongoose Model we just created 

var WareCommMap = require("../models/wareCommMap.model");
var CommodityService = require("../services/commodity.services");
var Organization = require("../models/organization.model");
// Saving the context of this module inside the _the variable
_this = this

//console.log("Inside WareCommMap service route:"+Commodity);
// Async function to get the WareComm List

exports.getWareCommMaps = async function (query, page, limit) {

    // Options setup for the mongoose paginate      
    console.log("Inside getWareCommMap:" + JSON.stringify(query));
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 
    var obj = null;
    try {
        var orgIdList = [];
        if (query._warehouseCode != null) {
            var str = "(?i)" + query._warehouseCode;
            var orgs = await Organization.find({ _orgName: { $regex: str } })

           
            for (const item of orgs) {
                var orgid = item._orgId;
                orgIdList.push(orgid)
            }
            orgIdList.push(query._warehouseCode);
        }
        var obj = queryObject(query, orgIdList);
        console.log(obj);
        var wareCommMaps = await WareCommMap.paginate(obj, options)

        var wareList = wareCommMaps.docs;
        console.log(wareList.length);
        var i=0;
        for(i=0;i<wareList.length;i++){
            var item = wareList[i];
            var org = await Organization.findOne({_orgId:item._warehouseCode});
            console.log("-------------------------------------------------------------------"+org);
            if(org!=null){
                item._warehouseName = org._orgName;
                wareList[i]=item;
            }
        }
        
        console.log(wareList);
        
        wareCommMaps.docs = wareList;
       
        // Return the wareComm list that was retured by the mongoose promise

        return wareCommMaps;

    } catch (e) {
        console.log(e);
        // return a Error message describing the reason 

        throw Error('Error while Paginating WareCommMaps')
    }
}

exports.getWareCommRec = async function (id) {

    //  Check for id   
    console.log("Inside getWareCommRec for id:" + id);
    var commodityDetails = new Array();
    try {
        var wareCommMap = await WareCommMap.findOne({ _warehouseCode: id });
        console.log(wareCommMap);

        

        if (wareCommMap == null) {
            wareCommMap = {};
        }else{
            var org = await Organization.findOne({_orgId:id});

            wareCommMap._warehouseName = org._orgName;
        }

        return wareCommMap;
    } catch (e) {
        throw Error("Error Occured while Fetching the wareCommMap")
    }
}

exports.createWareCommMap = async function (wareCommMap) {

    // Creating a new Mongoose Object by using the new keyword

    var newWareCommPack = new WareCommMap({
        _warehouseCode: wareCommMap._warehouseCode,
        _commId: wareCommMap._commId,
        _createdDate: new Date(),
        _createdBy: wareCommMap._createdBy
    })


    try {
        var saveWareComm = await newWareCommPack.save();
        return saveWareComm;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Mapping Ware Comm Map")
    }
}

exports.updateWareCommMap = async function (wareCommMap) {
    var id = wareCommMap._id
    console.log(id);
    try {
        //Find the old Ware Comm Object by the Id

        var oldWareCommMap = await WareCommMap.findById(id);
        console.log(oldWareCommMap);

    } catch (e) {
        console.log(e);
        throw Error("Error occured while Finding the Warehouse Commodity Map")
    }

    // If no old Ware Comm Map Object exists return false

    if (!oldWareCommMap) {
        return false;
    }

    console.log(oldWareCommMap)

    //Edit the Pack Object
    oldWareCommMap._commId = wareCommMap._commId,
        oldWareCommMap._modifiedDate = new Date(),
        oldWareCommMap._modifiedBy = wareCommMap._modifiedBy,

        console.log(oldWareCommMap)

    try {
        var saveWareComm = await oldWareCommMap.save()
        return saveWareComm;
    } catch (e) {
        throw Error("And Error occured while updating the Warehouse Commodity");
    }
}

exports.deleteWareCommMap = async function (id) {

    // Delete the Ware Comm map
    console.log(id);

    try {
        var deleted = await WareCommMap.deleteOne({ _id: id })
        console.log(deleted);

        if (deleted.deletedCount == 0) {
            throw Error("Ware Comm Map Could not be delete")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Ware Comm Map")
    }
}

exports.getCommDetails = async function (commodities) {
    console.log(commodities);
    var commDetails = [];

    for (const item of commodities) {
        var commObj = await CommodityService.getCommodity(item);
        commDetails.push(commObj)
    }
    console.log("commDtls:" + commDetails);
    return commDetails;
}

function queryObject(query,orgIdList) {
    var obj = {};
    if (orgIdList.length != 0) {
        obj._warehouseCode = { $in: orgIdList };
    }
    return obj;
}