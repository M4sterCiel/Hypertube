import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";
import { NavLink } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastname: "",
      firstname: "",
      username: "",
      email: "",
      pwd1: "",
      pwd2: "",
      lastnameError: "",
      firstnameError: "",
      usernameError: "",
      emailError: "",
      pwd2Error: "",
      lastnameValid: false,
      firstnameValid: false,
      usernameValid: false,
      emailValid: false,
      pwd1Valid: false,
      pwd1VerifyBox: "box-disabled",
      pwdHasLowercase: false,
      pwdHasUppercase: false,
      pwdHasNumber: false,
      pwdHasMinLen: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  handleChange = e => {
    console.log(e.target.value);
  };

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
                    id="user-username"
                    className="form-input-fields"
                    value={this.state.username}
                    onChange={this.handleChange}
                  ></input>
                  <label htmlFor="user-username">Username</label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="text"
                    id="user-firstname"
                    className="form-input-fields"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  ></input>
                  <label htmlFor="user-firstname">Firstname</label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="text"
                    id="user-lastname"
                    className="form-input-fields"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  ></input>
                  <label htmlFor="user-lastname">Lastname</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="email"
                    id="user-email"
                    className="form-input-fields"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                  <label htmlFor="user-email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="user-password"
                    className="form-input-fields"
                    value={this.state.pwd1}
                    onChange={this.handleChange}
                  ></input>
                  <label htmlFor="user-password">Password</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="user-repeat-password"
                    className="form-input-fields"
                    value={this.state.pwd2}
                    onChange={this.handleChange}
                  ></input>
                  <label htmlFor="user-repeat-password">Repeat password</label>
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
