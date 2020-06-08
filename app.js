const express = require("express")
const app = express();
require('dotenv').config()

const Movie = require("./models/Movie");
const Director = require("./models/Director");
var session = require('express-session');
var cookieParser = require('cookie-parser')
app.use(cookieParser());

app.use(session({
    secret: process.env.session_secret,
    resave: false,
    saveUninitialized: true,
  }))

const mongoose = require("mongoose");
const hbs = require("hbs");
const bodyParser = require('body-parser')

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/views/movies/partials');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.db,{
    useUnifiedTopology: true,
    useNewUrlParser: true
    })
    .then(()=> {
        console.log("connected");
    })
    .catch((err)=> {
        console.log("not connected");
    })

function addSessionToHbs(req,res,next){
    console.log("I am middleware too!");
    if(req.session.user) {
        res.locals.loggedIn = true;
        res.locals.user = req.session.user;    
     }
     next();
}
function protectMiddleWare(req,res,next) {
    if(req.session.user) next();
    else res.redirect(`/users/login?redirectUrl=${req.originalUrl}`);
}


function middleware1(req,res,next) {
    console.log("1 Middleware");
    req.messageInABottle = "secret message"
    next();
}
function middleware2(req,res,next) {
    console.log(req.messageInABottle);
    console.log("2 Middleware");
    next();
}
function middleware3(req,res,next) {
    console.log(req.messageInABottle);
    console.log("3 Middleware");
    next();
}

app.use("/chakalakawhoopwhoop", middleware1, middleware2, middleware3);
app.use(addSessionToHbs)
// app.use(protectMiddleWare);
// app.use(protectMiddleWare);
// app.use(protectMiddleWare);
// app.use(protectMiddleWare);
// app.use(protectMiddleWare);
app.use("/",middleware1, middleware2,middleware3, require("./routes/director/create"));
app.use("/movies/detail",middleware1,middleware1, protectMiddleWare, require("./routes/movies/detail"));
app.use("/movies", require("./routes/movies/update"));
app.use("/movies", require("./routes/movies/categories"));
app.use("/movies/create", require("./routes/movies/create"));
app.use("/movies/search", require("./routes/movies/search"));

app.use("/", require("./routes/movies/delete"));
app.use("/", require("./routes/movies/list"));

app.use("/users", require("./routes/users/logout"));
app.use("/", require("./routes/director/detail"));

app.use("/", require("./routes/users/signup"));
app.use("/", require("./routes/users/login"));

app.use(function(err, req,res,next) {
    console.log("errorrrrrr" ,err)
    debugger
    res.render("error", {message: err.message, statusCode: err.status})
})

app.listen(process.env.PORT, ()=> {
    console.log("Listening on:", process.env.PORT)
})