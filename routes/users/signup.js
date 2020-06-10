const express = require("express");
const app = express();
const User = require("../../models/User");
const bcrypt = require('bcrypt');
var createError = require('http-errors')

app.get("/username-available/:username", (req,res)=> {
    User.findOne({username: req.params.username})
        .then((user)=> {
            if(user){
                res.json({available: false})
            } else {
                res.json({available: true})
            }
        })
})

app.post("/signup", (req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            if(user) {
                res.redirect("/users/signup?error=username+taken");
            }
            else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err){
                        console.log("Hashing error", err);
                        next(createError(500, "Oeps, we have a problem. Please come back later."));
                    }
                    else {
                        User.create({
                            username: req.body.username,
                            password: hash
                        })
                        .then((user)=> {
                            res.redirect("/users/login")
                        })
                        .catch((err)=> {
                            next(createError(500, "Oeps, we have a problem. Please come back later."));
                        })
                    }
                });
            }
        })
    

})

app.get("/signup", (req,res)=> {
    if(req.query.error) {
        res.render("users/signup", {
            error: true, 
            message: req.query.error
        });
    } else {
        res.render("users/signup");
    }
})

module.exports = app;