const express = require("express");
const app = express();
const Movie = require("../../models/Movie");

app.get("/movies/update", (req,res)=> {
    
    Movie.findById(req.query.id)
        .then((movie)=> {    
            debugger
            res.render("movies/update", {movie: movie});
        })
        .catch(((err)=> {
            console.log("ERROR", err);
        }))
})

app.post("/movies/update", (req,res)=> {
    
    let movieId = req.body.id
    Movie.findByIdAndUpdate(movieId, {
            title: req.body.title,
            director: req.body.director,
            duration: req.body.duration
        })
        .then((movie)=> {
            res.redirect(`/movies/detail?id=${movie._id}`);
        })
        .catch((err)=> {
            console.log("err", err);
        })
})
module.exports = app;