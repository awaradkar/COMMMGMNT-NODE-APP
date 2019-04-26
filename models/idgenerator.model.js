var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

// define model =================
var idGeneratorSchema = new mongoose.Schema({
  _idKey: String,
  _idValue: Number,
  _createdDate:Date,
  _modifiedDate:Date
});

idGeneratorSchema.plugin(mongoosePaginate)
const IdGenerator = mongoose.model('IdGenerator', idGeneratorSchema)

module.exports = IdGenerator;