const express = require("express");
const app = express();
const Director = require("../../models/Director");

app.post("/director/create", (req,res)=> {
    let newDirector = req.body;
    Director.create(newDirector)
        .then((newDirector)=> {
            res.redirect(`/director/detail?id=${newDirector._id}`);
        })
        .catch((err)=> {
            console.log("err", err);
        })
})

app.get("/director/create", (req,res)=> {
    debugger
    res.render("director/create");
})

module.exports = app;