import React from "react";
import "./MoviesList.scss";

const MoviesPosters = ({ movies }) => {
  const MovieItem = ({ id, title, poster }) => (
    <div className="movie-poster-only col xl2 l3 m4 s6">
      <img alt={`The movie titled: ${title} ${id}`} src={poster} />
    </div>
  );

  const moviesList = movies =>
    movies.map(
      movie =>
        movie.id !== undefined && (
          <MovieItem key={movie.id} title={movie.title} poster={movie.poster} />
        )
    );

  return <div className="movies-posters-list">{moviesList(movies)}</div>;
};

export default MoviesPosters;
