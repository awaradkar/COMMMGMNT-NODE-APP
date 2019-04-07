var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// define model =================
var orgSchema = new mongoose.Schema({
  _orgId: String,
  _orgName: String,
  _orgType: String,
  _orgAddress: String,
  _orgLocation: String,
  _orgCity: String,
  _orgZipCode: String,
  _orgState: String,
  _orgDate: Date,
  _createdBy: String,
  _createdDate:Date,
  _modifiedBy:String,
  _modifiedDate:Date
});

orgSchema.plugin(mongoosePaginate)
const Organization = mongoose.model('Organizations', orgSchema)

module.exports = Organization;
