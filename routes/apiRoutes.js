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
                // Optional for organizing response in an object
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

router.post("/addcharacter", (req, res) => {
    console.log("creating character");

    let character = req.body;
    console.log(req.body);
    db.Character.create({
        id: character.id,
        characterName: character.characterName,
        health: character.health,
        experience: character.experience,
        inventory: character.inventory,
        bodyType: character.bodyType,
        hairType: character.hairType,
        color1: character.color1,
        color2: character.color2
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
});

router.post("/characterupdate/:id", (req, res) => {
    console.log("updating character")

    let character = req.body;
    db.Character.update(
        {
            characterName: character.characterName,
            health: character.health,
            experience: character.experience,
            inventory: character.inventory,
            bodyType: character.bodyType,
            hairType: character.hairType,
            color1: character.color1,
            color2: character.color2
        },
        { where: { id: req.params.id } }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
})

// Routes for inventory

router.get("/inventory", (req, res) => {
    console.log("getting inventory");

    db.PowerUp.findAll({})
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
})

// might not be needed

// router.post("/addinventory/:characterId", (req, res) => {
//     console.log("posting inventory");

//     let inventory = req.body;
//     db.PowerUp.create({
//         PowerUpName: inventory.PowerUpName,
//         PowerUpType: inventory.PowerUpType,
//         characterId: req.params.characterId
//     })
//         .then(data => { res.json(data) })
//         .catch(err => { console.log(err) })
// })

// Routes for tasks

router.get("/gettasks/:characterId", (req, res) => {
    console.log("getting tasks");

    db.ToDoTasks.findAll(
        { where: { characterId: req.params.characterId } }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
})

router.post("/updatetask/:taskId", (req, res) => {
    console.log("getting tasks");

    let task = req.body;
    db.ToDoTasks.update({
        taskName: task.taskName,
        taskNotes: task.taskNotes,
        frequency: task.taskFrequency,
        complete: task.taskComplete
    },
        { where: { id: req.params.taskId } }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
})

router.post("/deletetask/:taskId", (req, res) => {
    console.log("getting tasks");

    let task = req.body
    db.ToDoTasks.destroy({
        where: { id: req.params.taskId }
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
})

// Routes for Users

router.get("/getuser/:id", (req, res) => {
    console.log("Get User")
    console.log(req.params.id);
    db.User.findAll(
        { where: { id: req.params.id } }
    )
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


router.post("/adduser", (req, res) => {
    console.log("adding user")

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
        lastName: user.lastName,
        lastLogin: user.lastLogin
    })
        .then(data => { 
            console.log(data.User.dataValues)
            res.json(data.User.dataValues) 
        })
        .catch(err => { console.log(err) })
})

router.post("/updateuser/:id", (req, res) => {
    console.log("adding user")

    let user = req.body;
    db.User.update({
        userName: user.userName,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        lastLogin: user.lastLogin
    },
        { where: { id: req.params.id } })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) })
})


module.exports = router;



