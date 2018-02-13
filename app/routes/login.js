var login = require('express').Router()
var User = require('../modules/User')

login.get('/', (req, res) => {
  res.render('login')
})

login.post('/', (req, res) => {
  var username = req.body.username
  var password = req.body.password
  User.findOne({username: username}, (err, user) => {
    if (err) throw err
    if (!user) {
      res.render('login', {
        flash: 'Wrong Username Or Password1'
      })
    } else {
      if (user.password !== password) {
        console.log(user.password)
        res.render('login', {
          flash: 'Wrong Username or Password2'
        })
      } else {
        var auth = Math.random().toString().replace('.', '')
        user.auth = auth
        user.save(function () {
          res.cookie('session', {
            auth: auth,
            _id: user._id,
            username: user.username
          }).redirect('/')
        })
      }
    }
  })
})

module.exports = login
