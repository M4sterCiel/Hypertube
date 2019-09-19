import React, { useState } from "react";
import "./Filter.scss";

const Filter = ({ filter }) => {
//   const [searchValue, setSearchValue] = useState("");

//   const handleSearchInputChanges = e => {
//     setSearchValue(e.target.value);
//   };

  return (
    <div class="both">
      <div class="input-field col s12 m6">
        <select class="browser-default s2">
            <option value="" disabled selected>Genre</option>
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
      <div class="input-field col s12 m6">
        <select class="browser-default s2">
            <option value="" disabled selected>Rating</option>
            <option value="0">any</option>
            <option value="0">0 ☆</option>
            <option value="1">1 ☆</option>
            <option value="2">2 ☆</option>
            <option value="3">3 ☆</option>
            <option value="4">4 ☆</option>
            <option value="5">5 ☆</option>
            <option value="6">6 ☆</option>
            <option value="7">7 ☆</option>
            <option value="8">8 ☆</option>
            <option value="9">9 ☆</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;