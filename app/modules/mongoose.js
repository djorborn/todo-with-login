var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO);

var db = mongoose.connection;

db.on("error", console.error.bind(console, "mongodb error: "));

db.once("open", ()=>console.log("mongodb connected"));

module.exports = mongoose;
