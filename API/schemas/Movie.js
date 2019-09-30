const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
    imdbId: String,
    title: String,
    year: Number,
    plot: String,
    runtime: Number,
    genres: Array,
    trailer: String,
    poster: String,
    rating: Number,
    torrents: Array,
    lastViewed: Date,
    path720p: String,
    path1080p: String
});
module.exports = Movie = mongoose.model("Movie", MovieSchema);