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

  render() {
    return (
      <div>
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
            {/* <FacebookLogin
              appId="424805585055711"
              autoLoad={true}
              fields="name,email,picture"
              callback={this.responseFacebook}
              cssClass="my-facebook-button-class"
              icon="fa-facebook"
            /> */}
            <a href="/auth/facebook">Login with Facebook</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
