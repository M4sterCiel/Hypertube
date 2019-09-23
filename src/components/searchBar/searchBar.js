import React, { useState } from "react";
import Filter from "../../components/filter/Filter";
import "../buttons/Buttons.scss";
import "./searchBar.scss";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  const createSliderWithTooltip = Slider.createSliderWithTooltip;
  const Range = createSliderWithTooltip(Slider.Range);

  return (
    <div class="row">
      <form className="search">  
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
          class="input-field s1"
          placeholder="What movie are you looking for?"
        />
        <button disabled={searchValue.length < 2}
                onClick={callSearchFunction} 
                type="submit" 
                class="btn btn-secondary btn-medium waves-effect" 
                value="SEARCH">
          SEARCH
        </button>
        <Filter />
        <Range /> 
      </form>
    </div>
  );
};

export default Search;
