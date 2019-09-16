import React, { Component } from "react";
// import LandingPage from "../components/LandingPage/LandingPage";
import SearchView from "./Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <LandingPage /> */}
        <SearchView />
      </div>
    );
  }
}

export default App;
