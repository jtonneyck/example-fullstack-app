const express = require("express");
const app = express();
const Movie = require("../../models/Movie");

app.get("/", (req,res)=> {
    let objectIdOfMovieToBeDeleted = req.query.id;
    Movie.findByIdAndDelete(objectIdOfMovieToBeDeleted)
        .then((deletedMovie)=> {
            res.redirect("/");
        })
        .catch((err)=> {
            console.log(err);
        })
})

module.exports = app;