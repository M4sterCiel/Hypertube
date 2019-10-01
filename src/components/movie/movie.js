import React from "react";
import "./Movie.scss";

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <img
        // width="200"
        alt={`${movie.title}`}
        src={movie.poster}
      />
      <div className="movieInfosDiv">
        <p className="movieInfos">
          <strong>{movie.year} &nbsp;|&nbsp;</strong> {movie.rating} ☆
        </p>
      </div>
    </div>
  );
};

export default Movie;
