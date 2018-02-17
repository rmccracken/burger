const express = require('express');
let router = express.Router();
const burger = require('../models/burger.js');

router.get("/", (req, res) => {
    burger.all((data) => {
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burgers", (req, res) => {
    burger.create([
        "burger_name"
    ], [req.body.burger_name
        ], (result) => {
            res.redirect("/");
        });
});

router.put('/burgers/:id', (req, res) => {
    let condition = 'id = ' + req.params.id;
    burger.update({
        devoured: true
    }, condition, function (data) {
        res.redirect('/');
    });
});

module.exports = router; 