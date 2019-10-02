import React from "react";
import "./Movie.scss";

const Movie = ({ movie }) => {

  return (
    <div className="movie">
      <img
        alt={`${movie.title}`}
        src={movie.poster}
      />
      <div className="movieInfosDiv">
        { movie.title.lenght > 40 ? (
          <p className="movieTitle"><strong>{movie.title}</strong></p>
        ) : (
          <p className="movieTitle"><strong>{movie.title.substring(0, 25) + "..."}</strong></p>
        )}
        <p className="movieInfos">
          {movie.year} &nbsp;|&nbsp; {movie.rating} ☆
        </p>
      </div>
    </div>
  );
};

export default Movie;