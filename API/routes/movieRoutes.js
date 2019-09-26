const express = require("express");
const movieController = require("../controllers/movieControllers");

exports.router = (() => {
  var movieRouter = express.Router();

  movieRouter.route("/movie/:movie").get(movieController.getMovieStream);

  return movieRouter;
})();
