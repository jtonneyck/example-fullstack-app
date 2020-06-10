const express = require("express")
const app = express();
require('dotenv').config();

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

app.use(addSessionToHbs)
app.use(["/movies","/"], require("./routes/movies")); 
// all movie routes are bundled in ./routes/movies/index.js. require("./routes/movies") is equivalent to require("./routes/movies/index")
app.use("/director", require("./routes/director/create"));
app.use("/director", require("./routes/director/detail"));


app.use("/tvshows", require("./routes/tvshows/list"));

// all the user routes could be bundeld as well
app.use("/users", require("./routes/users/logout")); 
app.use("/users", require("./routes/users/signup"));
app.use("/users", require("./routes/users/login"));
app.use("/users", require("./routes/users/profile"));

app.use(function(err, req,res,next) {
    res.render("error", {message: err.message, statusCode: err.status})
})

app.listen(process.env.PORT, ()=> {
    console.log("Listening on:", process.env.PORT)
})