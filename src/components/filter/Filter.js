import React, { useState, useContext } from "react";
import "./Filter.scss";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { GlobalContext } from "../../context/GlobalContext";
import SearchContext from '../../context/SearchContext'

const Filter = ({ filter }) => {

  const genreList = [
    'All',
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Thriller',
    'War',
    'Western'
  ]

  const searchTerms = useContext(SearchContext);

  const [filterTerms, setFilterTerms] = useState(searchTerms);

  const handleRatingChanges = value => {
    setFilterTerms({
      ...filterTerms,
      ratings: value
    });
    filter(filterTerms);
  };

  const handleYearChanges = value => {
    setFilterTerms({
      ...filterTerms,
      years: value
    });
    filter(filterTerms);
  };

  const handleGenreChanges = value => {
    setFilterTerms({
      ...filterTerms,
      genre: value.toLowerCase()
    });
    filter(filterTerms);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    filter(filterTerms);
  };

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  return (
    <GlobalContext.Consumer>
      {context => {
        const locale = context.locale;
        var lang;
        switch (locale) {
          case "en":
            lang = require("../../locale/en");
            break;
          case "es":
            lang = require("../../locale/es");
            break;
          case "fr":
            lang = require("../../locale/fr");
            break;
          default:
            lang = require("../../locale/en");
        }
        return (
          <div class="all">
            <div class="RatingRange">
              <label>{lang.search[0].rating}</label>
              <Range
                min={0}
                max={10}
                allowCross={false}
                defaultValue={searchTerms.ratings}
                onAfterChange={handleRatingChanges}
              />
            </div>
            <div class="YearRange">
              <label>{lang.search[0].year}</label>
              <Range
                min={1915}
                max={2019}
                allowCross={false}
                defaultValue={searchTerms.years}
                onAfterChange={handleYearChanges}
              />
            </div>
            <select class="browser-default">
              {genreList.map(genre => (
              <option key={genre} 
                      value={genre} 
                      onChange={handleGenreChanges}
              >
                {genre}
              </option>
            ))}
            </select>
          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default Filter;
