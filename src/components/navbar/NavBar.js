import React, { Component } from "react";
import "./NavBar.scss";
import AuthService from "../../services/AuthService";
import { withRouter, NavLink } from "react-router-dom";
import { LoginButton, RegisterButton } from "../buttons/Buttons";
import { Button } from "react-materialize";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import logo from "../../assets/hyperflix_logo2.png";
import { GlobalContext } from "../../context/GlobalContext";

class NavBar extends Component {
  //static contextType = GlobalContext;
  constructor(props) {
    super(props);
    this.state = {
      left: false
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
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
        <GlobalContext.Consumer>
          {context => {
            const locale = context.locale;
            var lang;
            switch (locale) {
              case "en":
                lang = require("../../locale/en");
                break;
              case "es":
                lang = require("../../locale/es");
                break;
              case "fr":
                lang = require("../../locale/fr");
                break;
              default:
                lang = require("../../locale/en");
            }
            return (
              <div
                className={classes.list}
                role="presentation"
                onClick={toggleMenu(menu, false)}
                onKeyDown={toggleMenu(menu, false)}
              >
                <h5 style={{ textAlign: "center", color: "red" }}>Menu</h5>
                <List>
                  <ListItem>
                    <NavLink className="nav-mobile-menu-links" to="/login">
                      <i className="material-icons icons-red link-icon nav-mobile-menu-icons">
                        account_box
                      </i>
                      <span className="nav-mobile-menu-text">
                        {lang.navbar[0].login}
                      </span>
                    </NavLink>
                  </ListItem>
                  <ListItem>
                    <NavLink className="nav-mobile-menu-links" to="/register">
                      <i className="material-icons icons-red link-icon nav-mobile-menu-icons">
                        person_add
                      </i>
                      <span className="nav-mobile-menu-text">
                        {lang.navbar[0].register}
                      </span>
                    </NavLink>
                  </ListItem>
                </List>
              </div>
            );
          }}
        </GlobalContext.Consumer>
      );

      return (
        <div className="nav-mobile-menu">
          <Button
            className="nav-mobile-menu-btn"
            onClick={toggleMenu("left", true)}
          >
            <i className="material-icons icons-red">menu</i>
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
        <GlobalContext.Consumer>
          {context => {
            const locale = context.locale;
            var lang;
            switch (locale) {
              case "en":
                lang = require("../../locale/en");
                break;
              case "es":
                lang = require("../../locale/es");
                break;
              case "fr":
                lang = require("../../locale/fr");
                break;
              default:
                lang = require("../../locale/en");
            }
            return (
              <div>
                <LoginButton value={lang.navbar[0].login} />
                <RegisterButton value={lang.navbar[0].register} />
                <button onClick={this.handleLogout}>
                  {lang.navbar[0].logout}
                </button>
              </div>
            );
          }}
        </GlobalContext.Consumer>
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

  handleLogout = () => {
    this.Auth.logout();
    this.props.history.replace("/login");
  };
}

export default withRouter(NavBar);
