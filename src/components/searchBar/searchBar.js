import React, { useState, useContext } from "react";
import "../buttons/Buttons.scss";
import "./searchBar.scss";
import { GlobalContext } from "../../context/GlobalContext";
import CustomLanguage from "../../services/DefineLocale";
/* import SearchContext from '../../context/SearchContext' */

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
/*   const searchTerms = useContext(SearchContext); */

  const search = e => {
    e.preventDefault();
    resetInputField();
/*     searchTerms.keywords = searchValue; */
/*     console.log(searchTerms); */
  }

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  return (
    <GlobalContext.Consumer>
      {context => {
        const locale = context.locale;
        var lang = CustomLanguage.define(locale);
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
                onClick={search}
                type="submit"
                class="btn btn-secondary btn-medium waves-effect"
                value={lang.search[0].search}
              >
                {lang.search[0].search}
              </button>
            </form>
          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default Search;
