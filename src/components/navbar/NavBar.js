import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./NavBar.scss";
import { withRouter, NavLink } from "react-router-dom";
import logo from "../../assets/hyperflix_logo2.png";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <NavLink to="/" className="brand-logo">
              <img
                className="header-logo ml-2"
                src={logo}
                height="60px"
                width="90px"
                alt=""
              />
            </NavLink>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
