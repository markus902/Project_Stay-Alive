var express = require("express");
var mySQL = require("sequelize");
va

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb+srv://markus902:dasser@markuscluster-dmvcb.mongodb.net/articleScraper?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/index", function (req, res) {
    res.sendfile("./public/index.html");
})

app.get("/scrape", function (req, res) {
    axios.get("http://www.echojs.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        console.log("Blah" + response.title);
        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            console.log(this.text)
            // db.Article.findOne(this.value);
            // console.log(this.value)
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.json(result);
    });
});

app.get("/articles", function (req, res) {
    console.log("articles found")
    db.Article.find({}).then(function (allArticles) {
        res.json(allArticles);
    })
        .catch(function (err) {
            res.json(err)
        });
});

app.get("/articles/:id", function (req, res) {
    console.log("Article " + req.params.id);
    db.Article.findOne({
        _id: req.params.id
    })
        .populate("note")
        .then(function (oneArticle) {
            res.json(oneArticle);
        }).catch(function (err) {
            res.json(err)
        })
});

app.post("/articles/:id", function (req, res) {
    console.log(req.params, req.params.id, req.body);
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({
                _id: req.params.id
            }, { $push: { note: dbNote._id } }, { new: true })
        }).then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});



// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});