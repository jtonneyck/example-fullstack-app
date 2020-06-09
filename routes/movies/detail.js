const express = require("express");
const app = express();
const Movie = require("../../models/Movie");

app.get("/", (req, res)=> {
    let objectId = req.query.id
    Movie.findById(objectId)
        .populate("director")
        .then((movie)=> {
            res.render("movies/detail", {movie: movie});
        })
        .catch((err)=> {
            console.log("Err", err)
        })
})

module.exports = app;