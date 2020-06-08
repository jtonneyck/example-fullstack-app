const express = require("express");
const app = express();

app.get("/logout", (req,res)=> {
    req.session.destroy();
    res.redirect("/");
})

module.exports = app;