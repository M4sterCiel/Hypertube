import React, { useState } from "react";
import "./Filter.scss";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

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

  const prop = ["", ""];

  const handleGenreChanges = e => {
    prop = ["genre", e.target.value];
    filter(prop);
  };
  
  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  return (
      <div class="all">
        <div class="RatingRange">
          <label>Rating</label>
          <Range 
            min={0}
            max={10}
            allowCross={false}
            defaultValue={[0, 10]}
          /> 
          </div>
          <div class="YearRange">
            <label>Year</label>
            <Range 
              min={1915}
              max={2019}
              allowCross={false}
              defaultValue={[1915, 2019]}
            /> 
          </div>
          <select
            class="Genre browser-default"
            onChange={handleGenreChanges}
          >
            {genreList.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
      </div>
  );
};

export default Filter;
