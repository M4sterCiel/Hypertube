import React, { useState } from "react";
import Filter from "../../components/filter/Filter";
import "../buttons/Buttons.scss";
import "./searchBar.scss";
import { GlobalContext } from "../../context/GlobalContext";

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
    <GlobalContext.Consumer>
      {context => {
        console.log(context.locale);
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
          <div class="row">
            <form className="search">
              <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
                class="search-input-field s1"
                placeholder={lang.search[0].placeholder}
              />
              <button
                disabled={searchValue.length < 2}
                onClick={callSearchFunction}
                type="submit"
                class="btn btn-secondary btn-medium waves-effect"
                value={lang.search[0].search}
              >
                {lang.search[0].search}
              </button>
            </form>
            <Filter />
          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default Search;
