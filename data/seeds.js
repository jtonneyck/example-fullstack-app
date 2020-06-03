const Movie = require("../models/Movie");
const movies = require("./movies.json");
const directors = require("./directors.json");

moviesPromises = [];
movies.forEach((movie)=> {
    let director = directors.find((director)=> director.name === movie.director);
    if(director){
        moviesPromises.push(
            Movie.create({
                title: movie.title || "",
                year: movie.year || "" ,
                director: {
                    name: director.name,
                    image_url: director.image_url,
                    img_url_url: director.image_url_url,
                    biography: director.biography
                },
                duration: movie.duration,
                genre: movie.genre || [],
                rate: movie.rate || ""
            })
        )
    }
})
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/movies-embedded",{ 
    useUnifiedTopology: true,
    useNewUrlParser: true 
})
.then((connection)=> {
    console.log("connected")
    return Promise.all(moviesPromises);
})
.then((movies)=> {
    console.log("Database Seeded", movies);
    mongoose.connection.close();
})
.catch((err)=> {
    console.log("Not seeded", err);
})

