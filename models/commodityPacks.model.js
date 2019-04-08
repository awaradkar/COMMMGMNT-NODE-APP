var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// define model =================
var commodityPackSchema = new mongoose.Schema({
  _commId: String,
  _packs:Array,
  _createdDate: Date,
  _modifiedDate: Date,
  _createdBy: String,
  _modifiedBy: String
});

commodityPackSchema.plugin(mongoosePaginate)
const CommodityPack = mongoose.model('CommodityPack', commodityPackSchema)

module.exports = CommodityPack;
