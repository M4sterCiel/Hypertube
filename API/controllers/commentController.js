const Comment = require('../schemas/Comment');
const sanitize = require('mongo-sanitize');

const loadComments = async (req, res) => {
    try {
        const sorting = {};
        sorting['timestamp'] = -1;
        const queryTerms = [
            { $match: { movieImdbId: req.body.id } },
            { $sort: sorting },
        ]
        commentsList = await Comment.aggregate(queryTerms);
        res.status(200).json(commentsList);
    } catch (error) {
        console.log(error.message);
    }
}

const addComment = async (req, res) => {

    if (req.body.userId && req.body.firstname && req.body.movieImdbId && req.body.content && req.body.timestamp) {
        var comment = new Comment({
            userId: sanitize(req.body.userId),
            firstname: sanitize(req.body.firstname),
            movieImdbId: sanitize(req.body.movieImdbId),
            content: sanitize(req.body.content),
            timestamp: sanitize(req.body.timestamp),
        });
    
        try {
            commentRes = await Comment.collection.insertOne(comment);
            return res.status(200).json({ status: 'success' });
        } catch (error) {
            console.log(error.message);
        }
    }
}

const deleteComment = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadComments,
    addComment,
    deleteComment
}