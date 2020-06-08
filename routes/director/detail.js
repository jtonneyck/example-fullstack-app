const express = require("express");
const app = express();
const Director = require("../../models/Director");

app.get("/director/detail", (req,res)=> {
    Director.findById(req.query.id)
        .then((director)=> {
            res.render("director/details", {director});
        })
        .catch((err)=> {
            console.log("Err", err);
        })
})

module.exports = app;