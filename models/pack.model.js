var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// define model =================
var packSchema = new mongoose.Schema({
  _packType: String,
  _packDescription:String,
  _packDeduction:Number,
  _createdDate: Date,
  _modifiedDate: Date,
  _createdBy: String,
  _modifiedBy: String
});

packSchema.plugin(mongoosePaginate)
const Pack = mongoose.model('Packs', packSchema)

module.exports = Pack;
