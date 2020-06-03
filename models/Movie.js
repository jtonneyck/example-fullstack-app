const mongoose = require("mongoose");
module.exports = mongoose.model("Movie", {
    title: String,
    yeader: String,
    director: {type: mongoose.Schema.ObjectId, ref: "directors"},
    duration: String,
    rate: Number,
    genre: [
        String
    ]
}, "movies")

