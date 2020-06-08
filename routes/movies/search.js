const express = require("express");
const app = express();
const Movie = require("../../models/Movie");

app.get("/", (req,res)=>{
    res.render("movies/search");
})

app.get("/:title",(req,res)=>{
    //{ $regex: new RegExp(req.params.title)}
    Movie.find({ title: req.params.title})
        .populate("director")
        .then((movies)=> {
            res.json({movies});
        })
        .catch((err)=> {
           res.json({err})
        })
})

module.exports = app;