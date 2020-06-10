const express = require("express");
const app = express();
const Director = require("../../models/Director");

app.post("/create", (req,res)=> {
    let newDirector = req.body;
    Director.create(newDirector)
        .then((newDirector)=> {
            res.redirect(`/director/detail?id=${newDirector._id}`);
        })
        .catch((err)=> {
            console.log("err", err);
        })
})

app.get("/create", (req,res)=> {
    res.render("director/create");
})

module.exports = app;