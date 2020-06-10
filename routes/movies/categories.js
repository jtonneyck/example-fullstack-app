const express = require("express");
const app = express();
const Movie = require("../../models/Movie");

app.get("/",(req,res)=> {
    res.render("movies/categories/links");
})

app.get("/:category/:favouritePet",(req,res)=> {
    console.log(req.params.category, req.params.favouritePet)
    Movie.find({
        genre: req.params.category
    })
    .then((movies)=> {
        res.render("home", {movies: movies})
    })
    .catch((err)=> {
        console.log(err);
    })
})

app.get("/multiple/", (req,res)=> {
    res.render("movies/categories/checkboxes");
})
///multiple/categories/result
app.get("/result", (req,res)=> {
    console.log(req.query.genre);
    Movie.find({
        genre: {$in: req.query.genre}
    })
    .then((movies)=> {
        res.render("home", {movies: movies})
    })
    .catch((err)=> {
        console.log(err);
    })
})

app.get("/multiple/categoriesPost", (req,res)=> {
    res.render("movies/categories/checkboxesPost");
})

app.post("/multiple/result", (req,res)=> {
    console.log(req.body.genre);
    Movie.find({
        genre: {$in: req.body.genre}
    })
    .then((movies)=> {
        res.render("home", {movies: movies})
    })
    .catch((err)=> {
        console.log(err);
    })
})

module.exports = app;