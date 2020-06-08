const express = require("express");
const app = express();
const Movie = require("../../models/Movie");
const Director = require("../../models/Director");

app.post("/", (req,res)=> {
    let newMovie = req.body;
    Movie.create(newMovie)
        .then((movie)=> {
            res.redirect(`/movies/detail?id=${movie._id}`);
        })
        .catch((err)=> {
            console.log("err", err);
        })
})

app.get("/", (req,res)=> {
    Director.find()
        .then((directors)=> {
            res.render("movies/create", {directors});
        })
        .catch(err=> {
            console.log("Err", err);
            res.render("error", err);
        })
})

module.exports = app;