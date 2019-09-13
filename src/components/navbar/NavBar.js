import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./NavBar.scss";
import { withRouter, NavLink } from "react-router-dom";
import { LoginButton, RegisterButton } from "../buttons/Buttons";
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
                height="40px"
                width="100px"
                alt=""
              />
            </NavLink>
            <div className="nav-btns-right">
              <LoginButton />
              <RegisterButton />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
