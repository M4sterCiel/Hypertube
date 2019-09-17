import React, { useState } from "react";
import "../buttons/Buttons.scss";
import "./searchBar.scss";

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
        <button disabled={!searchValue}
                onClick={callSearchFunction} 
                type="submit" 
                class="btn btn-secondary btn-medium waves-effect" 
                value="SEARCH">
          SEARCH
        </button>  
      </form>
    </div>
  );
};

export default Search;