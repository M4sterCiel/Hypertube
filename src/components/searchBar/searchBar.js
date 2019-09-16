import React, { useState } from "react";

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
    <form className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
          class="form-control col-sm-3"
        />
        <button onClick={callSearchFunction} type="submit" class="btn btn-dark" value="SEARCH">SEARCH</button>
    </form>
  );
};

export default Search;