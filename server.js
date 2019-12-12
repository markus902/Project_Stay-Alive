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
if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "client", "build")));
};

// Routes
app.use("/api", require("./routes/apiRoutes"));
// Start the server

// Define any API routes before this runs
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
  
db.sequelize.sync({
    // force: true
}).then(function () {
    app.listen(PORT, () => {
        console.log("App listening on port 3001");
    });
});
