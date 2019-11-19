require("dotenv").config();
var express = require("express");

// Database Models
var db = require("./models");

// Middleware
const path = require("path");
var PORT = process.env.PORT || 3001;
var app = express();

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Authentication Middleware

if (!authConfig.domain || !authConfig.audience) {
    throw new Error(
        "Please make sure that auth_config.json is in place and populated"
    );
}

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "build")));

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

app.get("/api/external", checkJwt, (req, res) => {
    res.send({
        msg: "Your access token was successfully validated!"
    });
});


// Routes
app.use("/api", require("./routes/apiRoutes"));

// Start the server

db.sequelize.sync().then(function () {
    app.listen(PORT, () => {
        console.log("App listening on port 3001");
    });
});
