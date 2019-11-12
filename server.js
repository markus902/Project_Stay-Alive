var express = require("express");
var mySQL = require("sequelize");
// var db = require("./models");


var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use(express.static("public"));

// Routes
// app.use("/", require("./routes/routes"));

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});