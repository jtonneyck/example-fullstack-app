const express = require("express");
const app = express();

app.use("/", require("./list"));
app.use("/detail", require("./detail"));
app.use("/update", require("./update"));
app.use("/categories", require("./categories"));
app.use("/create", require("./create"));
app.use("/search", require("./search"));
app.use("/delete", require("./delete"));

module.exports = app;