const mongoose = require("mongoose");

module.exports = mongoose.model("Movie", {
    title: String,
    yeader: String,
    director: String,
    duration: String,
    rate: Number,
    genre: [
        String
    ]
}, "movies")