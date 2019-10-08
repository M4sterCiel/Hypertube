const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    userId: Number,
    movieImdbId: String,
    content: Array,
    timestamp: Date,
});

module.exports = Comment = mongoose.model("Comment", CommentSchema);