const express = require("express");
const app = express();
const Movie = require("../../models/Movie");
const Director = require("../../models/Director");

app.get("/", (req,res)=> {
    Director.find()
    .then((directors)=> {
        Movie.findById(req.query.id)
        .populate("director")
        .then((movie)=> {    
            directors = directors.map((director)=> {
                return ({
                    id: director.id,
                    name: director.name,
                    biography: directors.biography,
                    isCurrent: director.id === movie.director.id
                })
            })
            res.render("movies/update", {movie, directors});
        })
    })
    .catch(((err)=> {
        console.log("ERROR", err);
    }))


})

app.post("/", (req,res)=> {
    let movieId = req.body.id;
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
});

module.exports = app;