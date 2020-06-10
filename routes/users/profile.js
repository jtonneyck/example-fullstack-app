const express = require("express");
const app = express();
const User = require("../../models/User");
const createError = require('http-errors')
const multer = require("multer");
const upload = multer({ dest: './public/uploads/' });

app.get("/profile", (req,res,next)=> {
    User.findById(req.session.user._id)
        .then((user)=> {
            res.render("users/profile", {user})
        })
        .catch((err)=> {
            createError(500, "OOOeps, something went wrong.")
        })
})

app.post("/profile/upload-profile-picture", upload.single("picture"), (req,res, next)=> {    
    User.findByIdAndUpdate(req.session.user._id, {profile_img: req.file.filename})
        .then((user)=> {
            res.redirect("/users/profile")
        })
        .catch((err)=> {
            createError(500, "OOOeps, something went wrong.")
        })
})
module.exports = app;