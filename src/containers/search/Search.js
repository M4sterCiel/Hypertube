import React, { useReducer, useEffect, useState } from "react";
import axios from 'axios';
import withAuth from "../../services/withAuth";
import "./Search.scss";
// import Header from "./Header";
// import spinner from "../../spinner.gif";
import Movie from "../../components/movie/Movie";
import Search from "../../components/searchBar/SearchBar";
import Navbar from "../../components/navbar/NavBar";
import Filter from "../../components/filter/Filter";
import { SearchProvider } from '../../context/SearchContext';

const SearchView = () => {

  const [searchTerms, setSearchTerms] = useState({
    genre: "All",
    page: 1,
    ratings: [0, 10],
    years: [1915, 2019],
    keywords: "",
    limit: 10
  })

  const [searchResult, setSearchResult] = useState({movies: []});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.post("/search/movies", searchTerms);
        if (res.data.length !== 0) {
          if (searchTerms.page === 1)
            setSearchResult({ movies: [...res.data] })
          else
            setSearchResult(prev => ({movies: prev.movies.concat(res.data)}))
        }
      } catch(err) {
        if (err.response && err.response.status === 401) 
        console.log(err.response);
      }
    }
    fetchMovies();
  }, [searchTerms])

  const search = searchValue => {
    setSearchTerms({
      ...searchTerms,
      genre: "All",
      page: 1,
      ratings: [0, 10],
      years: [1915, 2019],
      keywords: searchValue,
      limit: 10
    })
  }

  const filter = filterTerms => {
    console.log("filterTerms.genre =", filterTerms.genre);
    setSearchTerms({
      ...searchTerms,
      genre: filterTerms.genre,
      page: 1,
      ratings: filterTerms.ratings,
      years: filterTerms.years,
      limit: 10
    })
  }

  return (
    <SearchProvider value={searchTerms}>
      <div className="SearchView">
        <div className="layer">
          <Navbar />
          <Search search={search}/>
          <Filter filter={filter}/>
          <div class="infiniteScroll">
            <div className="movies">
              {searchResult.movies.map((movie, index) => 
                <Movie key={`${index}-${movie.title}`} movie={movie} />
              )}
            </div>
          </div>
        </div>
      </div>
    </SearchProvider>
  );
};

export default withAuth(SearchView);
