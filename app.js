var express = require("express");
var app = express();
var mmongoose = require("./app/modules/mongoose");

app.set("view engine", "pug");
app.set("views", __dirname + "/app/views");

app.use(
	[express.static(__dirname + "/app/public")],
	[express.urlencoded({extended:false})],
	[require("cookie-parser")()]
	);

app.use(require("./app/routes/index"));

app.listen(3000);