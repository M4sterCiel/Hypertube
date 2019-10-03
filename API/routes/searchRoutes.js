const express = require('express');
const searchController = require('../controllers/searchController');

exports.router = (() => {
    var searchRouter = express.Router();
  
    searchRouter.route("/movies").post(async (req, res) => searchController.search(req, res));
  
    return searchRouter;
  })();