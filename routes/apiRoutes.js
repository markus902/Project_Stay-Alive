const express = require("express");
const router = express.Router();
const db = require("../models");

// GET Routes all characters
router.get("/getdata", (req, res) => {

    console.log("I am getting all data");

    db.User.findAll({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
        });
});



// router.get("/user/:id"), (req, res) => {
//     console.log("Getting User")

//     db.User.findAll({ id: req.params.id })
//         .then(res.send(data));

// }


// Post route to push current data and calculate time that passed



module.exports = router;
