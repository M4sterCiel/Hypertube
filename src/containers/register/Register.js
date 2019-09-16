import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";
import { NavLink } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container-background">
          <div className="row">
            {" "}
            <div className="card-panel center auth-card">
              {" "}
              <div className="title-page">Register</div>
              <form className="register-form">
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="user-register"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-register">Username</label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="text"
                    id="user-register"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-register">Firstname</label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="text"
                    id="user-register"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-register">Lastname</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="email"
                    id="user-register"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-register">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="user-password"
                    className="form-input-fields"
                  ></input>
                  <label htmlFor="user-password">Password</label>
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Register"
                  className="btn-submit-form"
                  /* disabled={!this.state.loginValid || !this.state.pwdValid} */
                />
              </form>
              <p className="register-login-link link-right">
                Already have an account?{" "}
                <NavLink className="red-link" to="/login">
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
