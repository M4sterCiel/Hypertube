const express = require("express");
const movieController = require("../controllers/movieControllers");

exports.router = (() => {
    var movieRouter = express.Router();

    movieRouter
        .route("/:uid/:movieId/:quality/:source")
        .get(movieController.getMovieStream);

    return movieRouter;
})();
