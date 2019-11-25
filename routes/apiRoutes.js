const express = require("express");
const router = express.Router();
const db = require("../models");

// GET Routes all characters

router.get("/character/:id", (req, res) => {
    console.log("getting character");
    console.log(req.params.id);

    db.Character.findAll({ where: { characterID: req.params.id } })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
});

// Routes for inventory

router.get("/inventory", (req, res) => {
    console.log("getting inventory");

    db.PowerUp.findAll({})
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
})

// Routes for Users

router.get("/getuser/:id", (req, res) => {
    console.log("Get User")
    console.log(req.params.id);
    db.User.findAll({ where: { id: req.params.id } })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) })
})

router.post("/user", (req, res) => {
    console.log("pust user info")

    let user = req.body;
    db.User.create({
        userName: user.userName,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) })
})


module.exports = router;
