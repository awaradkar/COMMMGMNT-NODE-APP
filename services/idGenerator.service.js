// Gettign the Newly created Mongoose Model we just created 

var IdGenerator = require("../models/idgenerator.model");
// Saving the context of this module inside the _the variable
_this = this

//console.log("Inside commodity service route:"+Commodity);
// Async function to get the Commodity List

exports.getId = async function (key) {

    // Options setup for the mongoose paginate      
    console.log("Inside getId:" + key);

    var obj = null;
    try {
        let idStr = "";
        var idObj = await IdGenerator.findOne({_idKey:key});
        // Get the id object

        if(idObj==null){
            var newIdObj = new IdGenerator({
                _idKey: key,
                _idValue: 1,
                _createdDate:new Date(),
            });

            idStr = key + "" + 1;
            idObj = await newIdObj.save();
            console.log(idObj);
        }else{
            let previousVal = idObj._idValue;
            let newVal = previousVal + 1;
            idObj._idValue = newVal,
            idObj._modifiedDate = new Date();
            idStr = key+""+previousVal;
            idObj = await idObj.save();
        }
        return idStr;

    } catch (e) {

        // return a Error message describing the reason 
        console.log(e);
        throw Error('Error while setting id')
    }
}