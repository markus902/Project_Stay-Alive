const express = require("express");
const router = express.Router();
const db = require("../models");
const moment = require('moment')

// GET Routes characters

router.get("/character/:id", (req, res) => {
    db.Character.findAll({
        where: { id: req.params.id },
        include: [
            { model: db.User },
            { model: db.ToDoTasks },
            { model: db.CharacterPowerUps }
        ]
    })
        .then(
            data => {
                res.json(data);
            })
        .catch(err => { console.log(err) });
});

router.post("/addcharacter", (req, res) => {
    let character = req.body;
    db.Character.findOrCreate({
        where: {
            UserId: character.UserId
        },
        defaults: {
            characterName: character.characterName,
            bodyType: character.bodyType,
            hairType: character.hairType,
            experience: 0,
            health: 100,
            color1: character.color1,
            color2: character.color2,
            UserId: character.UserId,
            inventory: { "items": [] }
        }
    })
        .then(data => {
            db.User.update(
                { CharacterId: data[0].id },
                { where: { id: character.UserId } }
            ).then((some) => {
                res.json(data)
            })
        })
        .catch(err => { console.log(err); });
});

router.post("/characterupdate/:id", (req, res) => {
    let character = req.body;
    db.Character.update(
        {
            health: character.health,
            experience: character.experience,
            // inventory: character.inventory,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
});

// Routes for inventory
// get all inventory from db.PowerUp table
router.get("/inventory/", (req, res) => {
    db.PowerUp.findAll({})
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
});

// getting character specific inventory from db.CharacterPowerUps association table
router.get("/inventory/:characterId", (req, res) => {

    db.CharacterPowerUps.findAll({
        where: { CharacterId: req.params.characterId },
        include: [{ model: db.PowerUp }]
    })
        .then(data => {
            res.json(data)
        })
        .catch(err => { console.log(err) })
});

// add an item to a character on db.CharacterPowerUps association table
router.post("/addinventory/", (req, res) => {
    console.log("posting item to the CharacterPowerUps table");
    let newItem = req.body;
    db.CharacterPowerUps.create(newItem)
        .then(data => {
            res.json(data)
        })
        .catch(err => { console.log(err) })
});

// might not work, need to filter by 2 req.params
// route to use an item and remove it from their character on CharacterPowerUps
router.post("/useItem/", (req, res) => {
    console.log("posting item used to CharacterPowerUps table");
    const { currentCharacterId, PowerUpId } = req.body;
    console.log(currentCharacterId, PowerUpId)
    db.CharacterPowerUps.destroy({
        where: {
            characterId: currentCharacterId,
            id: PowerUpId
        }
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
});

// Route to award health or xp to character
router.post("/activatePowerUp/:characterId", (req, res) => {
    db.Character.update({
        health: req.body.health,
        experience: req.body.experience
    },
        {
            where: { id: req.params.characterId }
        })
        .then(data => { console.log("Hi"), res.json(data) })
        .catch(err => { console.log(err) })
});

router.put("/characterLevel/:id", (req, res) => {
    console.log("character leveling up now")
    console.log(req.params.id)
    const { health, exp } = req.body
    db.Character.update({
        health: health,
        experience: exp
    },
        { where: { id: req.params.id } })
        .then((data) => {
            console.log("update task id", data)
            db.Character.findAll({
                where: { id: req.params.id },
                include: [
                    { model: db.User },
                    { model: db.ToDoTasks }
                ]
            })
                .then(
                    data => {
                        res.json(data);
                    })
        })
        .catch(err => { console.log(err) })
})

router.get("/itembyid/:itemid", (req, res) => {
    db.PowerUp.findOne({
        where: { id: req.params.itemid }
    }).then((itemData) => {
        console.log(itemData)
        res.json(itemData)
    }).catch(err => res.json(err))
})


// Routes for tasks

router.get("/gettasks/:characterId", (req, res) => {
    db.ToDoTasks.findAll(
        { where: { characterId: req.params.characterId } }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
})

router.post("/createtask", (req, res) => {
    let task = req.body;
    db.ToDoTasks.findOrCreate(
        { where: { taskName: req.body.taskName, CharacterId: req.body.CharacterId }, defaults: req.body }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
});

router.put("/completeTask/:taskId", (req, res) => {
    rightNow = moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ")
    console.log(rightNow)
    db.ToDoTasks.update(
        { complete: rightNow },
        { where: { id: req.params.taskId } }
    )
        .then(data => {
            console.log("API Line 184->Task Response from Task Update", data)
            console.log("API Line 185->character id From Task Data", req.body.CharacterId)
            db.Character.findAll({
                where: { id: req.body.CharacterId },
                include: [
                    { model: db.User },
                    { model: db.ToDoTasks }
                ]

            })
                .then(
                    charData => {
                        console.log("API Line 196->Task Add and Character Data Sent")
                        res.json(charData);
                    })
        })
        .catch(err => { console.log(err) });
});

router.put("/removeTask/:taskId", (req, res) => {
    const taskId = req.params.taskId
    db.ToDoTasks.update(
        { complete: "1980-01-02 12:00" },
        { where: { id: taskId } }
    )
        .then(data => {

            db.Character.findAll({
                where: { id: req.body.CharacterId },
                include: [
                    { model: db.User },
                    { model: db.ToDoTasks }
                ]

            })
                .then(
                    data => {
                        console.log(data)
                        res.json(data);
                    })
        })
        .catch(err => { console.log(err) });
});


router.post("/deletetask/:taskId", (req, res) => {
    db.ToDoTasks.destroy({
        where: { id: req.params.taskId }
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
});

// Routes for Users

router.get("/getuser/:id", (req, res) => {
    db.User.findAll(
        { where: { id: req.params.id } }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) })
});
router.get("/getuserbyusername/:username", (req, res) => {
    db.User.findAll({ where: { userName: req.params.username } })
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch(err => { console.log(err) });
});


router.post("/adduser", (req, res) => {
    let user = req.body;
    db.User.findOrCreate({
        where: {
            userName: user.username
        }
        ,
        defaults: {
            userName: user.username,
            email: user.email,
            lastLogin: user.lastLogin,
        }
    })
        .then(data => {
            res.json(data[0].dataValues)
        })
        .catch(err => { console.log(err) });
});

router.post("/updateuser/:id", (req, res) => {
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
        .catch(err => { console.log(err) });
});


module.exports = router;



