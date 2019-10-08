const express = require('express');
const commentController = require('../controllers/commentController');

exports.router = (() => {
    var commentRouter = express.Router();
  
    commentRouter.route("/add").post(async (req, res) => commentController.add(req, res));
    commentRouter.route("/delete").post(async (req, res) => commentController.delete(req, res));
  
    return commentRouter;
  })();