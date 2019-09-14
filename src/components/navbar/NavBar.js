import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./NavBar.scss";
import { withRouter, NavLink } from "react-router-dom";
import { LoginButton, RegisterButton } from "../buttons/Buttons";
import { Button } from "react-materialize";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import logo from "../../assets/hyperflix_logo2.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const useStyles = makeStyles(theme => ({
      margin: {
        margin: theme.spacing(2),
        marginRight: theme.spacing(3)
      },
      list: {
        width: 320
      }
    }));

    const MobileLoggedOutLinks = () => {
      const toggleMenu = (menu, open) => event => {
        if (
          event &&
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }

        this._isMounted && this.setState({ [menu]: open });
      };

      const classes = useStyles();

      const MobileMenuLoggedOut = menu => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleMenu(menu, false)}
          onKeyDown={toggleMenu(menu, false)}
        >
          <h5 style={{ textAlign: "center", color: "#ffb6d3" }}>Menu</h5>
          <List>
            <ListItem>
              <NavLink className="mobile-menu-links" to="/users/login">
                <i className="material-icons link-icon mobile-menu-icons">
                  account_box
                </i>
                <span className="mobile-menu-notif-text">Log in</span>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink className="mobile-menu-links" to="/users/register">
                <i className="material-icons link-icon mobile-menu-icons">
                  person_add
                </i>
                <span className="mobile-menu-notif-text">Register</span>
              </NavLink>
            </ListItem>
          </List>
        </div>
      );

      return (
        <div className="nav-mobile-links">
          <Button
            className="nav-mobile-menu-btn"
            onClick={toggleMenu("left", true)}
          >
            <i className="material-icons">menu</i>
          </Button>
          <SwipeableDrawer
            anchor="left"
            open={this.state.left}
            onClose={toggleMenu("left", false)}
            onOpen={toggleMenu("left", true)}
          >
            {MobileMenuLoggedOut("left")}
          </SwipeableDrawer>
        </div>
      );
    };

    const LoggedOutLinks = () => {
      return (
        <div>
          <LoginButton />
          <RegisterButton />
        </div>
      );
    };

    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <MobileLoggedOutLinks />
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
              <LoggedOutLinks />
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(NavBar);
