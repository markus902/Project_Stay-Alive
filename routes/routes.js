const express = require("express");
const router = express.Router();
// const db = require("../models");

// GET Routes
router.get("/getdata", (req, res) => {
    res.send({ testdata: "hello" });
});

module.exports = router;
