const mongoose = require("mongoose");

module.exports = mongoose.model("Director", {
    name: String,
    image_url: String,
    image_url_url: String,
    biography: String,
}, "directors");