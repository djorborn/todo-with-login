var index = require('express').Router()
var User = require('../modules/User')

index.use('/register', require('./register'))

index.get('/logout', require('../modules/logout'))

index.use('/login', require('./login'))

index.get('/', checkAuth, require('./login'))
index.use('/', require('./home'))

module.exports = index

function checkAuth (req, res, next) {
  var session = req.cookies.session
  if (session) {
    var auth = session.auth
    User.findOne({auth: auth}, (err, user) => {
      if (err) throw err
      if (user) {
        next('route')
      } else {
        next()
      }
    })
  } else {
    next()
  }
}
