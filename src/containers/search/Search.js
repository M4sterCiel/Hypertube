import React, { useReducer, useEffect } from "react";
import "./Search.scss";
// import Header from "./Header";
import spinner from "../../spinner.gif";
import Movie from "../../components/movie/movie";
import Search from "../../components/searchBar/searchBar";
import Navbar from "../../components/navbar/NavBar";
import Filter from "../../components/filter/Filter";

const MOVIE_API_URL = "https://yts.lt/api/v2/list_movies.json?minimum_rating=8.5&order_by=asc"; // https://yts.lt/api/v2/list_movies.json?query_term=man https://www.omdbapi.com/?s=man&apikey=4a3b711b

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: 'No movies found'
      };
    default:
      return state;
  }
};

const SearchView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.data.movies
        });
      });
  }, []);

  // you can add this to the onClick listener of the Header component
  //   const refreshPage = () => {
  //     window.location.reload();
  //   };

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    fetch(`https://yts.lt/api/v2/list_movies.json?query_term=${searchValue}`) 
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.status_message === "Query was successful" && jsonResponse.data.movie_count > 0) {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.movies
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
        console.log(jsonResponse);
      });
  };

  const { movies, errorMessage, loading } = state;

  return (
    <div className="SearchView">
      <div class="layer">
        <Navbar />
        {/* <Header text="HyperFlix" /> */}
        <Search search={search}/>
        <div className="movies">
          {loading && !errorMessage ? (
            <img className="spinner" src={spinner} alt="Loading spinner" />
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.title}`} movie={movie} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchView;
