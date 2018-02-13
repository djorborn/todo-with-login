var register = require('express').Router()
var User = require('../modules/User')

register.get('/', (req, res) => {
  res.render('register', {

  })
})

register.post('/', (req, res) => {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  })
  User.findOne({username: user.username}, (err, result) => {
    if (err) throw err
    if (!result) {
      user.save(function () {
        res.redirect('/login')
      })
    } else {
      res.render('register', {
        flash: 'Username Unavailable'
      })
    }
  })
})

module.exports = register
