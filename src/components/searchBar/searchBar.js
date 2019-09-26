import React, { useState } from "react";
import Filter from "../../components/filter/Filter";
import "../buttons/Buttons.scss";
import "./searchBar.scss";
import { GlobalContext } from "../../context/GlobalContext";
import CustomLanguage from "../../services/DefineLocale";

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

  const filter = props => {
    console.log(props);
  }

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
                onClick={callSearchFunction}
                type="submit"
                class="btn btn-secondary btn-medium waves-effect"
                value={lang.search[0].search}
              >
                {lang.search[0].search}
              </button>
            </form>
            <Filter filter={filter}/>
          </div>
        );
      }}
    </GlobalContext.Consumer>
  );
};

export default Search;
