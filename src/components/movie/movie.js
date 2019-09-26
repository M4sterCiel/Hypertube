import React from "react";
import "./movie.scss";

const Movie = ({ movie }) => {
  return (
    <div className="movie">
      {/* <h2><strong>{movie.title}</strong></h2> */}
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
