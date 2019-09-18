import React, { Component } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./LandingPage.scss";
import Navbar from "../navbar/NavBar";
import { LpBigButton } from "../buttons/BigButtons";
import { withRouter } from "react-router-dom";
//import FacebookLogin from "react-facebook-login";

class LandingPage extends Component {
  responseFacebook = response => {
    console.log(response);
  };

  authGoogle = () => {
    window.location.replace("http://localhost:5000/auth/google");
  };
  authFacebook = () => {
    window.location.replace("http://localhost:5000/auth/facebook");
  };
  authGithub = () => {
    window.location.replace("http://localhost:5000/auth/github");
  };
  auth42 = () => {
    window.location.replace("http://localhost:5000/auth/42");
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container-background-image">
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
            <button onClick={this.authGoogle}>Login with Google</button>
            <button onClick={this.authGithub}>Login with Github</button>
            <button onClick={this.auth42}>Login with 42</button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(LandingPage);
