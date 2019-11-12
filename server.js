var express = require("express");
// var mySQL = require("sequelize");
// var db = require("./models");

// Middleware
const path = require("path");
var PORT = process.env.PORT || 3001;
var app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", require("./routes/routes.js"));

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});