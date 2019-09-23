import React from "react";
import "./movie.scss";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
  const poster =
    movie.large_cover_image === "N/A"
      ? DEFAULT_PLACEHOLDER_IMAGE
      : movie.large_cover_image;
  return (
    <div className="movie">
      {/* <h2><strong>{movie.title}</strong></h2> */}
      <div>
        <img alt={`The movie titled: ${movie.title}`} src={poster} />
      </div>
      <p>
        <strong>{movie.year} &nbsp;|&nbsp;</strong> {movie.rating} ☆
      </p>
    </div>
  );
};

export default Movie;
