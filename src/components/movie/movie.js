import React from "react";
import "./Movie.scss";

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      <div>
        <img
          width="200"
          alt={`${movie.title}`}
          src={movie.poster}
        />
      </div>
      <p>
        <strong>{movie.year} &nbsp;|&nbsp;</strong> {movie.rating} ☆
      </p>
    </div>
  );
};

export default Movie;
