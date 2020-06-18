const express = require("express");
const app = express();
const protectMiddleWare = require("../../middleware/protectMiddleware");

app.use("/", require("./list"));
app.use(["/detail", "/update", "/categories","/create", "/search", "/delete"],protectMiddleWare);
app.use("/detail", require("./detail"));
app.use("/update", require("./update"));
app.use("/categories", require("./categories"));
app.use("/create", require("./create"));
app.use("/search", require("./search"));
app.use("/delete", require("./delete"));

module.exports = app;