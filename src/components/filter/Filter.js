import React, { useState } from "react";
import "./Filter.scss";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { GlobalContext } from "../../context/GlobalContext";

const Filter = ({ filter }) => {
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
                defaultValue={[0, 10]}
              />
            </div>
            <div class="YearRange">
              <label>{lang.search[0].year}</label>
              <Range
                min={1915}
                max={2019}
                allowCross={false}
                defaultValue={[1915, 2019]}
              />
            </div>
            <select class="browser-default">
              <option value="" disabled selected>
                {lang.search[0].genre}
              </option>
              <option value="0">any</option>
              <option value="1">Action</option>
              <option value="2">Comedy</option>
              <option value="3">Horror</option>
              <option value="4">Thriller</option>
              <option value="5">Drama</option>
              <option value="6">Adventure</option>
              <option value="7">Fantasy</option>
              <option value="8">Animation</option>
              <option value="8">Sci-Fi</option>
            </select>
          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default Filter;
