var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// define model =================
var wareCommMapSchema = new mongoose.Schema({
  _warehouseCode: String,
  _warehouseName:String,
  _commId:Array,
  _createdDate: Date,
  _modifiedDate: Date,
  _createdBy: String,
  _modifiedBy: String
});

wareCommMapSchema.plugin(mongoosePaginate)
const WareCommMap = mongoose.model('WareCommMapSchema', wareCommMapSchema)

module.exports = WareCommMap;
