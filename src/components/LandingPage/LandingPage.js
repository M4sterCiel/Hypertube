import React, { Component } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./LandingPage.scss";
import Navbar from "../navbar/NavBar";
import { LpBigButton } from "../buttons/BigButtons";
import { withRouter } from "react-router-dom";
  
class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="landing-page">
          <div className="landing-page-title row">
            Enjoy movies and series on HyperFlix
          </div>
          <div className="landing-page-content">
            <div className="landing-page-content-text">
              Only a few clicks away from your daily entertainment...
            </div>
            <div className="landing-page-content-title-second">
              <i className="material-icons landing-page-content-title-icon">
                money_off
              </i>
              No credit card required - it's free
            </div>
            <LpBigButton />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);