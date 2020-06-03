const express = require("express")
const app = express();
const Movie = require("./models/Movie");
const mongoose = require("mongoose");
const hbs = require("hbs");
const bodyParser = require('body-parser')

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost/video",{
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(()=> {
        console.log("connected");
    })
    .catch((err)=> {
        console.log("not connected");
    })
const createRoute = require("./routes/movies/create");
app.use("/", createRoute);
// app.use("/", require("./routes/movies/create"));

app.use("/", require("./routes/movies/detail"));
app.use("/", require("./routes/movies/update"));

app.get("/",(req,res)=>{
    Movie.find({})
        .then((movies)=> {
            res.render("home", {movies});
        })
        .catch((err)=> {
            console.log(err)
        })
})
app.get("/movies/delete", (req,res)=> {
    let objectIdOfMovieToBeDeleted = req.query.id;
    Movie.findByIdAndDelete(objectIdOfMovieToBeDeleted)
        .then((deletedMovie)=> {
            res.redirect("/");
        })
        .catch((err)=> {
            console.log(err);
        })
})

app.get("/movies/categories",(req,res)=> {
    res.render("movies/categories/links");
})

app.get("/movies/:category/categories/:favouritePet",(req,res)=> {
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

app.get("/movies/multiple/categories", (req,res)=> {
    res.render("movies/categories/checkboxes");
})
///movies/multiple/categories/result
app.get("/movies/multiple/categories/result", (req,res)=> {
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

app.get("/movies/multiple/categoriesPost", (req,res)=> {
    res.render("movies/categories/checkboxesPost");
})

app.post("/movies/multiple/categories/result", (req,res)=> {
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



app.listen(3000, ()=> {
    console.log("Listening")
})