import React, { useState } from "react";

const Filter = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  return (
    <div class="input-field col s12">
        <select>
            <option value="" disabled selected>Genre</option>
            <option value="1">Action</option>
            <option value="2">Comedy</option>
            <option value="3">Horror</option>
            <option value="4">Thriller</option>
        </select>
        <select>
            <option value="" disabled selected>Year</option>
            <option value="1">Action</option>
            <option value="2">Comedy</option>
            <option value="3">Horror</option>
            <option value="4">Thriller</option>
        </select>
        <select>
            <option value="" disabled selected>Rating</option>
            <option value="1">Action</option>
            <option value="2">Comedy</option>
            <option value="3">Horror</option>
            <option value="4">Thriller</option>
        </select>
    </div>
  );
};

export default Filter;