var express = require('express')
var app = express()
var path = require('path').join

app.set('view engine', 'pug')
app.set('views', path(__dirname, '/app/views'))

app.use(
  [express.static(path(__dirname, '/app/public'))],
  [express.urlencoded({extended: false})],
  [require('cookie-parser')()]
)

app.use(require('./app/routes/index'))

app.listen(3000)
