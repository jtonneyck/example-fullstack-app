const express = require("express");
const app = express();
const axios = require("axios");

app.get("/list", (req,res)=> {

    axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.api_key_movies}`)
        .then((response)=> {
            res.render("tvshows/list", {tvshows: response.data.results});
        })
        .catch((err)=> {
            console.log(err)
        })
})

module.exports = app;