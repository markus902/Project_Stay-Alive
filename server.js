require("dotenv").config();
var express = require("express");
const morgan = require("morgan");

// Database Models
var db = require("./models");

// Middleware
const path = require("path");
var PORT = process.env.PORT || 3001;
var app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", require("./routes/apiRoutes"));
// Start the server

db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, () => {
        console.log("App listening on port 3001");
    });
});
