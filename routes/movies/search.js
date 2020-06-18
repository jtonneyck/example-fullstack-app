const express = require("express");
const app = express();
const Movie = require("../../models/Movie");

app.get("/", (req,res)=>{
    res.render("movies/search");
})

app.get("/:searchTerm",(req,res)=>{
    Movie.find({ $text: { $search: req.params.searchTerm}})
        .populate("director")
        .then((movies)=> {
            res.json({movies});
        })
        .catch((err)=> {
           res.json({err})
        })
})

module.exports = app;