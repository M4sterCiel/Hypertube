import React, { Component } from "react";
import "./Login.scss";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";
import { NavLink } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container-background">
          <div className="row">
            <div className="card-panel center auth-card">
              {" "}
              <div className="title-page">Log in</div>
              <form className="login-form">
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="user-login"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-login">Username or email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="user-password"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-password">Password</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="user-repeat-password"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-repeat-password">Repeat password</label>
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Login"
                  className="btn-submit-form"
                  /* disabled={!this.state.loginValid || !this.state.pwdValid} */
                />
              </form>
              <p className="register-login-link link-left">
                Forgot password?{" "}
                <NavLink className="red-link" to="/forgot-password">
                  Click here
                </NavLink>
              </p>
              <p className="register-login-link link-right">
                Don't have an account yet?{" "}
                <NavLink className="red-link" to="/register">
                  Register
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
