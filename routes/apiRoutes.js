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
    console.log("creating character");

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
            console.log(data[0].id)
            db.User.update(
                { CharacterId: data[0].id },
                { where: { id: character.UserId } }
            ).then((some) => {
                console.log(some)
                res.json(data)
            })
        })
        .catch(err => { console.log(err); });
});

router.post("/characterupdate/:id", (req, res) => {
    console.log("updating character")
    console.log("req.body in server: ", req.body);

    let character = req.body;
    db.Character.update(
        {
            health: character.health,
            experience: character.experience,
            inventory: character.inventory,
        },
        {
            where: {
                id: req.params.id
            }
        }
        // {
        //     defaults: {
        //         characterName: character.characterName,
        //         health: character.health,
        //         experience: character.experience,
        //         inventory: character.inventory,
        //         bodyType: character.bodyType,
        //         hairType: character.hairType,
        //         color1: character.color1,
        //         color2: character.color2
        //     }
        // }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
});

// Routes for inventory

router.get("/inventory/", (req, res) => {
    console.log("getting inventory");
    db.PowerUp.findAll({})
        .then(data => { res.json(data) })
        .catch(err => { console.log(err); });
});


// router.get("/inventory/:itemId", (req, res) => {
//     console.log("getting inventory");

//     db.PowerUp.findAll({})
//         .then(data => { res.json(data) })
//         .catch(err => { console.log(err); });
// });



// router.get("/items/:itemid", (req, res) => {
//     let item = req.params.itemid;
//     db.PowerUp.findAll({ where: { id: item } })
//         .then(response => { res.json(response) })
// });

router.get("/inventory/:characterId", (req, res) => {
    console.log("getting character specific inventory");
    db.CharacterPowerUps.findAll({
        where: { CharacterId: req.params.characterId },
        include: [{ model: db.PowerUp }]
    })
        .then(data => {
            console.log(data);
            res.json(data)
        })
        .catch(err => { console.log(err) })
});

// router.get("/items/:itemid", (req, res) => {
//     let item = req.params.itemid;
//     db.PowerUp.findAll({ where: { id: item } })
//         .then(response => { res.json(response) })
// });

// Route to get character Specific inventory from db.CharacterPowerUps
router.get("/inventory/:characterId", (req, res) => {
    console.log("getting character specific inventory");
    db.CharacterPowerUps.findAll({
        where: { CharacterId: req.params.characterId },
        include: [{ model: db.PowerUp }]
    })
        .then(data => {
            console.log(data);
            res.json(data)
        })
        .catch(err => { console.log(err) })
})

// // Route to remove item from character. Might not work, need to filter by 2 req.params
// router.post("/useItem/:characterId", (req, res) => {
//     console.log("posting item used to CharacterPowerUps table");
//     db.CharacterPowerUps.destroy({
//         where: {
//             characterId: req.parms.characterId,
//             powerUpId: req.params.itemId
//         }
//     })
// });

// might not work, need to filter by 2 req.params
// route to use an item and remove it from their character on CharacterPowerUps
router.post("/useItem/:characterId", (req, res) => {
    console.log("posting item used to CharacterPowerUps table");
    db.CharacterPowerUps.destroy({
        where: {
            characterId: req.parms.characterId,
            powerUpId: req.params.itemId
        }
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
});

// Route to award health or xp to character
router.post("/activatePowerUp/:characterId", (req, res) => {
    console.log("Power up activated!");
    db.Character.update({
        where: { characterId: req.params.characterId }

    })
});


router.put("/characterLevel/:id", (req, res) => {
    const { health, exp } = req.body
    db.Character.update({
        health: health,
        experience: exp
    },
        { where: { id: req.params.id } })
        .then((data) => {
            db.Character.findAll({
                where: { id: req.params.Id },
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

// might not be needed
// Route to add an item to a character
// router.post("/addinventory/:characterId", (req, res) => {
//     console.log("posting inventory");

//     let inventory = req.body;
//     db.CharacterPowerUps.create({
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

router.post("/createtask", (req, res) => {
    let task = req.body;
    console.log("creating tasks", task);
    db.ToDoTasks.findOrCreate(
        { where: { taskName: req.body.taskName }, defaults: req.body }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
});

router.put("/completeTask/:taskId", (req, res) => {
    console.log("getting tasks");
    db.ToDoTasks.update(
        { complete: new Date() },
        { where: { id: req.params.taskId } }
    )
        .then(data => {
            console.log(data)
            db.Character.findAll({
                where: { id: req.body.CharacterId },
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
        .catch(err => { console.log(err) });
});

router.put("/removeTask/:taskId", (req, res) => {
    console.log("remove tasks");
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
    console.log("delete tasks");
    db.ToDoTasks.destroy({
        where: { id: req.params.taskId }
    })
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) });
});

// Routes for Users

router.get("/getuser/:id", (req, res) => {
    console.log("Get User");
    console.log(req.params.id);
    db.User.findAll(
        { where: { id: req.params.id } }
    )
        .then(data => { res.json(data) })
        .catch(err => { console.log(err) })
});
router.get("/getuserbyusername/:username", (req, res) => {
    console.log("Get User");
    console.log(req.params.username);
    db.User.findAll({ where: { userName: req.params.username } })
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch(err => { console.log(err) });
});


router.post("/adduser", (req, res) => {
    console.log("adding user");

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
            console.log(data[0].dataValues)
            res.json(data[0].dataValues)
        })
        .catch(err => { console.log(err) });
});

router.post("/updateuser/:id", (req, res) => {
    console.log("adding user");

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



