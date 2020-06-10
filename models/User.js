const mongoose = require("mongoose");

module.exports = mongoose.model("User", {
    username: String,
    password: String,
    profile_img: {
        type: String,
        default: "/images/smiley.jpg"
    },
}, "users");