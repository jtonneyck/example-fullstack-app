const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const schema = new mongoose.Schema({
    title: String,
    year: String,
    director: {type: mongoose.Schema.ObjectId, ref: "Director"},
    duration: String,
    rate: Number,
    genre: [
        String
    ]
})

schema.index({ year: 'text', title: 'text', genre: 'text'});

module.exports = mongoose.model("Movie", schema, "movies")

