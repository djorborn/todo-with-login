var mongoose = require('./mongoose')
var Schema = mongoose.Schema

var todoSchema = new mongoose.Schema({
  title: String,
  txt: Array,
  date: Date,
  author: {type: Schema.Types.ObjectId, ref: 'User'}
})
var Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
