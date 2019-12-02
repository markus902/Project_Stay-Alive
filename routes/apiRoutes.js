const express = require("express");
const router = express.Router();
const db = require("../models");

// GET Routes characters

router.get("/character/:id", (req, res) => {
    console.log("getting character");
    console.log(req.params.id);

    db.Character.findAll({
        where: { id: req.params.id },
        include: [
            { model: db.User },
            { model: db.PowerUp },
            { model: db.ToDoTasks }
        ]

    })
        .then(
            data => {
                // return Object.assign(
                //     {},
                //     {
                //         characterName: data.characterName,
                //         health: data.health,
                //         email: data.email
                //     }
                // )
                res.json(data);
            })
        .catch(err => { console.log(err) });
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
router.get("/getuserbyusername/:username", (req, res) => {
    console.log("Get User")
    console.log(req.params.username);
    db.User.findAll({ where: { userName: req.params.username } })
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch(err => { console.log(err) })
})


router.post("/user", (req, res) => {
    console.log("post user info")

    let user = req.body;
    console.log(user)
    db.User.findOrCreate({
        where:{
            userName: user.username
        }
        ,
        defaults:{
        userName: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
        }
    })
        .then(data => { 
            console.log(data.User.dataValues)
            res.json(data.User.dataValues) 
        })
        .catch(err => { console.log(err) })
})


module.exports = router;



