const express = require('express');
const commentController = require('../controllers/commentController');

exports.router = (() => {
    var commentRouter = express.Router();
  
    commentRouter.route("/loadComment").post(async (req, res) => commentController.load(req, res));
    commentRouter.route("/addComment").post(async (req, res) => commentController.add(req, res));
    commentRouter.route("/deleteComment").post(async (req, res) => commentController.delete(req, res));
  
    return commentRouter;
  })();