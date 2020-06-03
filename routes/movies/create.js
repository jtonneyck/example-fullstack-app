const express = require("express");
const app = express();
const Movie = require("../../models/Movie");

app.post("/movies/create", (req,res)=> {
    debugger
    let newMovie = req.body;
    Movie.create(newMovie)
        .then((movie)=> {
            res.redirect(`/movies/detail?id=${movie._id}`);
        })
        .catch((err)=> {
            console.log("err", err);
        })
})

app.get("/movies/create", (req,res)=> {
    debugger
    res.render("movies/create");
})

module.exports = app;