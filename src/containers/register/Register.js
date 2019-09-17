import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import "./Register.scss";
import NavBar from "../../components/navbar/NavBar";
import { NavLink } from "react-router-dom";
import ValidateInput from "../../services/ValidateInput";

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

  handleChange = e => {
    let result;
    if (e.target.id === "pwd1") {
      result = ValidateInput.user("passwordHard", e.target.value);
    } else if (e.target.id === "pwd2") {
    } else {
      result = ValidateInput.user(e.target.id, e.target.value);
    }
    this._isMounted &&
      this.setState({ [e.target.id]: e.target.value, ...result });
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
                    id="username"
                    className="form-input-fields"
                    value={this.state.username}
                    onChange={this.handleChange}
                  ></input>
                  <div className="register-error">
                    {this.state.usernameError}
                  </div>
                  <label htmlFor="username">Username</label>
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
                  <label htmlFor="firstname">Firstname</label>
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
                  <label htmlFor="lastname">Lastname</label>
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
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="pwd1">Password</label>
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
                  <label htmlFor="pwd2">Repeat password</label>
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
