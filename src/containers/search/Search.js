import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import withAuth from "../../services/withAuth";
import "./Search.scss";
import Movie from "../../components/movie/movie";
import Search from "../../components/searchBar/searchBar";
import Navbar from "../../components/navbar/NavBar";
import Filter from "../../components/filter/Filter";
import { SearchProvider } from "../../context/SearchContext";

const SearchView = () => {
    const [searchTerms, setSearchTerms] = useState({
        genre: "All",
        page: 1,
        ratings: [0, 10],
        years: [1915, 2019],
        keywords: "",
        limit: 40
    });

    const [searchResult, setSearchResult] = useState({ movies: [] });

    useEffect(() => {
        const fetchMovies = async () => {
            console.log(searchTerms);
            try {
                const res = await axios.post("/search/movies", searchTerms);
                if (res.data.length !== 0) {
                    if (searchTerms.page === 1)
                        setSearchResult({ movies: [...res.data] });
                    else
                        setSearchResult(prev => ({
                            movies: prev.movies.concat(res.data)
                        }));
                }
            } catch (err) {
                if (err.response && err.response.status === 401)
                    console.log(err.response);
            }
        };
        fetchMovies();
    }, [searchTerms]);

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
    setSearchResult({movies: []});
    setSearchTerms({
      ...searchTerms,
      page: 1,
      keywords: searchValue,
    })
  }
  const ratings = ratings => {
    setSearchResult({movies: []});
    setSearchTerms({
      ...searchTerms,
      page: 1,
      ratings: ratings,
    })
  }
  const years = years => {
    setSearchResult({movies: []});
    setSearchTerms({
      ...searchTerms,
      page: 1,
      years: years,
    })
  }
  const genre = genre => {
    setSearchResult({movies: []});
    setSearchTerms({
      ...searchTerms,
      page: 1,
      genre: genre,
    })
  }

    useEffect(() => {
        window.document
            .getElementById("infiniteScroll")
            .addEventListener("scroll", handleScroll);
        return () =>
            window.document
                .getElementById("infiniteScroll")
                .removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (
            window.document.getElementById("infiniteScroll").scrollTop +
                window.document.getElementById("infiniteScroll").clientHeight >=
            window.document.getElementById("infiniteScroll").scrollHeight - 120
        ) {
            setSearchTerms(p => {
                const terms = {
                    ...p,
                    page: p.page + 2
                };
                return terms;
            });
            return;
        }
    };

    return (
        <SearchProvider value={searchTerms}>
            <div className="SearchView" id="SearchView">
                <div className="layer">
                    <Navbar />
                    <Search search={search} />
                    <Filter ratings={ratings} years={years} genre={genre} />
                    <div className="infiniteScroll" id="infiniteScroll">
                        {searchResult.movies.map((movie, index) => (
                            <Movie
                                key={`${index}-${movie.title}`}
                                movie={movie}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </SearchProvider>
    );
};

export default withAuth(SearchView);
