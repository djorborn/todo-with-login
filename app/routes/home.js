var home = require('express').Router()
var Todo = require('../modules/Todo')

// DASHBOARD PAGE

home.get('/', (req, res) => {
  var auth = req.cookies.session._id
  Todo.find({author: auth}, (err, lists) => {
    if (err) throw err
    res.render('dash', {
      lists: lists
    })
  })
})

// Delete List
home.post('/delete_list', (req, res) => {
  Todo.findOne({_id: req.body.id}, (err, todo) => {
    if (err) throw err
  }).remove(function () {
    res.sendStatus(200)
  })
})

// TODO Page
home.get('/todo', (req, res) => {
  Todo.findOne({_id: req.query.id}, (err, todo) => {
    if (err) throw err
    res.render('todo', {
      list_title: todo.title,
      items: todo.txt
    })
  })
})

home.get('/create_new_list', (req, res) => {
  var todo = new Todo()
  todo.author = req.cookies.session._id
  todo.date = new Date()
  todo.save(function () {
    res.redirect('/todo?id=' + todo._id)
  })
})

home.post('/update_title', (req, res) => {
  var title = req.body.title
  var id = req.body.id
  if (title !== '') {
    Todo.findOne({_id: id}, (err, todo) => {
      if (err) throw err
      todo.title = title
      todo.save(() => res.sendStatus(200))
    })
  }
})

home.post('/new_item', (req, res) => {
  Todo.findOne({_id: req.body.id}, (err, todo) => {
    if (err) throw err
    todo.txt.push(req.body.txt)
    todo.save(() => {
      res.sendStatus(200)
    })
  })
})
// Delete Item
home.post('/delete_item', (req, res) => {
  Todo.findOne({_id: req.body.id}, (err, todo) => {
    if (err) throw err
    todo.txt.splice(req.body.index, 1)
    todo.save(function () {
      res.sendStatus(200)
    })
  })
})
module.exports = home
