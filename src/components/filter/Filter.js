import React, { useState, useContext } from "react";
import "./Filter.scss";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { GlobalContext } from "../../context/GlobalContext";
import SearchContext from '../../context/SearchContext'

const Filter = ({ ratings, years, genre }) => {

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

  const handleRatingChanges = value => {
    ratings(value);
  };

  const handleYearChanges = value => {
    years(value);
  };

  const handleGenreChanges = e => {
    genre(e.target.value.toLowerCase());
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
          <div className="all">
            <div className="RatingRange">
              <label>{lang.search[0].rating}</label>
              <Range
                min={0}
                max={10}
                allowCross={false}
                defaultValue={searchTerms.ratings}
                onChange={handleRatingChanges}
              />
            </div>
            <div className="YearRange">
              <label>{lang.search[0].year}</label>
              <Range
                min={1915}
                max={2019}
                allowCross={false}
                defaultValue={searchTerms.years}
                onChange={handleYearChanges}
              />
            </div>
            <select className="browser-default"
                    onChange={handleGenreChanges}
            >
              {genreList.map(genre => (
              <option key={genre} 
                      value={genre} 
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
