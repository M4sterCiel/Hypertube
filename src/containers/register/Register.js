import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./Register.scss";
import NavBar from "../../components/navbar/NavBar";
import { NavLink } from "react-router-dom";
import ValidateInput from "../../services/ValidateInput";
import TwitterLogo from "../../assets/Twitter_Logo_WhiteOnBlue.png";
import GoogleLogo from "../../assets/Google_Logo.png";
import GithubLogo from "../../assets/Github_Logo.png";
import SchoolLogo from "../../assets/42_Logo.png";
import ErrorToast from "../../services/toasts/ErrorToasts";

import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
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

  componentWillUnmount() {
    this._isMounted = false;
  }
  authGoogle = () => {
    window.location.replace("http://localhost:5000/auth/google");
  };
  authGithub = () => {
    window.location.replace("http://localhost:5000/auth/github");
  };
  auth42 = () => {
    window.location.replace("http://localhost:5000/auth/42");
  };
  authTwitter = () => {
    window.location.replace("http://localhost:5000/auth/twitter");
  };

  handleChange = e => {
    let result;
    if (e.target.id === "pwd1") {
      result = ValidateInput.user("passwordHard", e.target.value);
    } else if (e.target.id !== "pwd2") {
      result = ValidateInput.user(e.target.id, e.target.value);
    }
    this._isMounted &&
      this.setState({ [e.target.id]: e.target.value, ...result });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/users/register", {
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        pwd1: this.state.pwd1,
        pwd2: this.state.pwd2
      })
      .then(res => {
        if (res.data.status === "success") {
          this.props.history.push("/login");
        }
      })
      .catch(err => {
        ErrorToast.custom.error(err.response.data.error, 4000);
      });
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
              <form className="register-form" onSubmit={this.handleSubmit}>
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="username"
                    className="form-input-fields"
                    value={this.state.username}
                    onChange={this.handleChange}
                  ></input>
                  <div className="register-error">
                    {this.state.usernameError}
                  </div>
                  <label className="label-form" htmlFor="username">
                    Username
                  </label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="text"
                    id="firstname"
                    className="form-input-fields"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                  ></input>
                  <div className="register-error">
                    {this.state.firstnameError}
                  </div>
                  <label className="label-form" htmlFor="firstname">
                    Firstname
                  </label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="text"
                    id="lastname"
                    className="form-input-fields"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  ></input>
                  <div className="register-error">
                    {this.state.lastnameError}
                  </div>
                  <label className="label-form" htmlFor="lastname">
                    Lastname
                  </label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="email"
                    id="email"
                    className="form-input-fields"
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></input>
                  <div className="register-error">{this.state.emailError}</div>
                  <label className="label-form" htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="pwd1"
                    className="form-input-fields"
                    value={this.state.pwd1}
                    onChange={this.handleChange}
                    onFocus={e =>
                      this.setState({ pwd1VerifyBox: "box-enabled" })
                    }
                    onBlur={e =>
                      this.setState({ pwd1VerifyBox: "box-disabled" })
                    }
                    required
                  />
                  <div
                    className={"password-message " + this.state.pwd1VerifyBox}
                  >
                    <h3 id="pwd1-verify-title">
                      Password must contain the following:
                    </h3>
                    <p
                      id="letter"
                      className={
                        this.state.pwdHasLowercase ? "valid" : "invalid"
                      }
                    >
                      A <b>lowercase</b> letter
                    </p>
                    <p
                      id="capital"
                      className={
                        this.state.pwdHasUppercase ? "valid" : "invalid"
                      }
                    >
                      A <b>capital (uppercase)</b> letter
                    </p>
                    <p
                      id="number"
                      className={this.state.pwdHasNumber ? "valid" : "invalid"}
                    >
                      A <b>number</b>
                    </p>
                    <p
                      id="length"
                      className={this.state.pwdHasMinLen ? "valid" : "invalid"}
                    >
                      Minimum <b>8 characters</b>
                    </p>
                  </div>
                  <label className="label-form" htmlFor="pwd1">
                    Password
                  </label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="pwd2"
                    className="form-input-fields"
                    value={this.state.pwd2}
                    onChange={this.handleChange}
                  ></input>
                  <div className="register-error">
                    {this.state.pwd2 !== this.state.pwd1 &&
                    this.state.pwd2 !== ""
                      ? "Passwords don't match"
                      : ""}
                  </div>
                  <label className="label-form" htmlFor="pwd2">
                    Repeat password
                  </label>
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Register"
                  className="btn btn-submit-form"
                  disabled={
                    !this.state.lastnameValid ||
                    !this.state.firstnameValid ||
                    !this.state.usernameValid ||
                    !this.state.emailValid ||
                    !this.state.pwd1Valid ||
                    this.state.pwd2 !== this.state.pwd1
                  }
                />
              </form>
              <div className="register-login-with-social">
                <p className="register-login-social-text">Or register with</p>
                <img
                  onClick={this.auth42}
                  src={SchoolLogo}
                  alt="42 logo"
                  className="third-party-logo"
                ></img>
                <img
                  onClick={this.authTwitter}
                  src={TwitterLogo}
                  alt="twitter logo"
                  className="third-party-logo"
                ></img>
                <img
                  onClick={this.authGoogle}
                  src={GoogleLogo}
                  alt="google logo"
                  className="third-party-logo"
                ></img>
                <img
                  onClick={this.authGithub}
                  src={GithubLogo}
                  alt="github logo"
                  className="third-party-logo"
                ></img>
              </div>
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
