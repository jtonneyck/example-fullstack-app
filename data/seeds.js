const Movie = require("../models/Movie");
const Director = require("../models/Director");
const movies = require("./movies.json");
const directors = require("./directors.json");

function makeMoviePromiseArray(){
    let moviesWithKnownDirectors = [];
    movies.forEach((movie)=> {
        let director = directors.find((director)=> director.name === movie.director);
        if(director){
            moviesWithKnownDirectors.push(
                Director
                    .findOne({name: director.name})
                    .then(directorDocument=> {
                        console.log("Le realisateur", directorDocument)
                        return Movie.create({
                                title: movie.title || "",
                                year: movie.year || "" ,
                                duration: movie.duration,
                                genre: movie.genre || [],
                                rate: movie.rate || "",
                                director: directorDocument.id
                            })
                    })
            )
        }
    })
    return moviesWithKnownDirectors;
}


let directorsWithKnownMoviesPromises = [];
directors.forEach((director)=> {
    let movie = movies.find((movie)=> director.name === movie.director);
    if(movie){
        directorsWithKnownMoviesPromises.push(
            Director.create({
                    name: director.name || "",
                    img_url: director.img_url || "" ,
                    img_url_url: director.img_url_url,
                    biography: director.biography || "",
            })
        )
    }
})

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/movies-reference",{ 
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
.then((connection)=> {
    console.log("connected")
    return Promise.all(directorsWithKnownMoviesPromises);
})
.then((directors)=> {
    console.log("directors created", directors)
    return Promise.all(makeMoviePromiseArray());
})
.then((movies)=> {
    console.log("Database Seeded", movies);
    mongoose.connection.close();
})
.catch((err)=> {
    console.log("Not seeded", err);
})

