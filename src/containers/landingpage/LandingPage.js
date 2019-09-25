import React, { Component } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./LandingPage.scss";
import Navbar from "../../components/navbar/NavBar";
import { LpBigButton } from "../../components/buttons/BigButtons";
import { withRouter } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import CustomLanguage from "../../services/DefineLocale";

class LandingPage extends Component {
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          const locale = context.locale;
          var lang = CustomLanguage.define(locale);
          return (
            <div className="App">
              <Navbar />
              <div className="container-background-image">
                <div className="landing-page-title row">
                  {lang.home[0].line1}
                </div>
                <div className="landing-page-content">
                  <div className="landing-page-content-text">
                    {lang.home[0].line2}
                  </div>
                  <div className="landing-page-content-title-second">
                    <i className="material-icons icons-red landing-page-content-title-icon">
                      money_off
                    </i>
                    {lang.home[0].line3}
                  </div>
                  <LpBigButton value={lang.home[0].try_it} />
                </div>
              </div>
            </div>
          );
        }}
      </GlobalContext.Consumer>
    );
  }
}
export default withRouter(LandingPage);
