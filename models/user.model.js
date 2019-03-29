var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// define model =================
var userSchema = new mongoose.Schema({
  _userId: String,
  _userName: String,
  _userRole: Number,
  _userOrg: String,
  _userPassword: String,
  _createdDate: Date,
  _modifiedDate: Date,
  _createdBy: String,
  _modifiedBy: String
});

userSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', userSchema)

module.exports = User;
