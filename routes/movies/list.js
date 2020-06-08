const express = require("express");
const app = express();
const Movie = require("../../models/Movie");
var createError = require('http-errors')

app.get("/",(req,res,next)=>{
    Movie.find({})
        .populate("director")
        .then((movies)=> {
            res.render("movies/list", {movies});
        })
        .catch((err)=> {
            next(createError(500, "Server error"));
        })
})

module.exports = app;