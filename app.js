var express = require('express')
var app = express()

app.set('view engine', 'pug')
app.set('views', '/app/views')

app.use(
  [express.static(require('path').join(__dirname, '/app/public'))],
  [express.urlencoded({extended: false})],
  [require('cookie-parser')()]
)

app.use(require('./app/routes/index'))

app.listen(3000)
