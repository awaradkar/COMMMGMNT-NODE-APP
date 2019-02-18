var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// define model =================
var commoditySchema = new mongoose.Schema({
  _commId: String,
  _commName: String,
  _description: String,
  _createdDate: Date,
  _modifiedDate: Date,
  _createdBy: String,
  _modifiedBy: String,
  _unitOfMeasure: String
});

commoditySchema.plugin(mongoosePaginate)
const Commodity = mongoose.model('Commodity', commoditySchema)

module.exports = Commodity;
