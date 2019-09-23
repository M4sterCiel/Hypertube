import React, { useState } from "react";
import "./Filter.scss";

const Filter = ({ filter }) => {
  //   const [searchdefaultValue, setSearchdefaultValue] = useState("");

  //   const handleSearchInputChanges = e => {
  //     setSearchdefaultValue(e.target.defaultValue);
  //   };

  return (
    <div className="both">
      <div className="input-field col s12 m6">
        <select className="browser-default s2">
          <option defaultValue="" disabled selected>
            Genre
          </option>
          <option defaultValue="0">any</option>
          <option defaultValue="1">Action</option>
          <option defaultValue="2">Comedy</option>
          <option defaultValue="3">Horror</option>
          <option defaultValue="4">Thriller</option>
          <option defaultValue="5">Drama</option>
          <option defaultValue="6">Adventure</option>
          <option defaultValue="7">Fantasy</option>
          <option defaultValue="8">Animation</option>
          <option defaultValue="8">Sci-Fi</option>
        </select>
      </div>
      <div className="input-field col s12 m6">
        <select className="browser-default s2">
          <option defaultValue="" disabled selected>
            Rating
          </option>
          <option defaultValue="0">any</option>
          <option defaultValue="0">0 ☆</option>
          <option defaultValue="1">1 ☆</option>
          <option defaultValue="2">2 ☆</option>
          <option defaultValue="3">3 ☆</option>
          <option defaultValue="4">4 ☆</option>
          <option defaultValue="5">5 ☆</option>
          <option defaultValue="6">6 ☆</option>
          <option defaultValue="7">7 ☆</option>
          <option defaultValue="8">8 ☆</option>
          <option defaultValue="9">9 ☆</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
