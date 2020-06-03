const mongoose = require("mongoose");
const directorSchema = new mongoose.Schema({
    name: String,
    img_url: String,
    img_url_url: String,
    biography: String
})
module.exports = mongoose.model("Movie", {
    title: String,
    yeader: String,
    director: directorSchema,
    duration: String,
    rate: Number,
    genre: [
        String
    ]
}, "movies")