const express = require("express");
const router = express.Router();
const db = require("../models");

// GET Routes characters

router.get("/character/:id", (req, res) => {
    console.log("getting character");
    console.log(req.params.id);

    db.Character.findAll({ where: { characterID: req.params.id } })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
});

router.post("/character", (req, res) => {
    console.log("creating character");

    let character = req.body;
    db.Character.create({
        characterID: character.characterID,
        characterName: character.characterName,
        health: character.health,
        experience: character.experience,
        inventory: character.inventory
    })
})

// Routes for inventory

router.get("/inventory", (req, res) => {
    console.log("getting inventory");

    db.PowerUp.findAll({})
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
})

router.post("/inventory", (req, res) => {
    console.log("posting inventory");

    let inventory = req.body;
    db.PowerUp.create({
        PowerUpName: inventory.name,
        PowerUpType: inventory.type
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) })
})

// Routes for tasks

router.get("/tasks", (req, res) => {
    console.log("getting tasks");

    db.toDoTask.findAll({})
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
})

router.get("/updatetask", (req, res) => {
    console.log("getting tasks");

    let task = req.body
    db.toDoTask.update({
        taskName: task.name,
        taskNotes: task.notes,
        frequency: task.frequency,
        complete: task.complete
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
})

router.get("/deletetask", (req, res) => {
    console.log("getting tasks");

    let task = req.body
    db.toDoTask.delete({

    })
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


// Calls needed


// Body Type:

// 2
// Hair Type:

// 2
// Color 1:

// 2
// Color 2:

