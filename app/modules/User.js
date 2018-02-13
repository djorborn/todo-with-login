var mongoose = require('./mongoose')
var Schema = mongoose.Schema

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  auth: String,
  lists: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
})

var User = mongoose.model('User', userSchema)

module.exports = User
