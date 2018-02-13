var User = require('./User')

module.exports = function (req, res, next) {
  var session = req.cookies.session
  if (!session) {
    res.clearCookie('session')
  } else {
    var auth = session.auth
    User.findOne({auth: auth}, (err, user) => {
      if (err) throw err
      user.auth = ''
      user.save(() => {
        res.clearCookie('session').redirect('/')
      })
    })
  }
}
