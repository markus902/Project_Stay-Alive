const express = require("express");
const router = express.Router();
const db = require("../models");

// GET Routes
router.get("/getdata", (req, res) => {

    console.log("I am getting data");

    db.User.findAll({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;
