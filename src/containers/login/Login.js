import React, { Component } from "react";
import "./Login.scss";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";
import { NavLink } from "react-router-dom";
import ValidateInput from "../../services/ValidateInput";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      loginError: "",
      pwdError: "",
      loginValid: false,
      pwdValid: false,
      responseToPost: ""
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  handleChange = e => {
    const isLogin = e.target.id === "user-login";
    const isPwd = e.target.id === "user-password";

    if (isLogin) {
      let result = ValidateInput.user.login(e.target.value);
      this._isMounted &&
        this.setState({
          login: e.target.value,
          loginValid: result.loginValid,
          loginError: result.loginError
        });
    }

    if (isPwd) {
      let result = ValidateInput.user.passwordSimple(e.target.value);
      this._isMounted &&
        this.setState({
          password: e.target.value,
          pwdValid: result.pwdValid,
          pwdError: result.pwdError
        });
    }
  };

  handleSubmit = async e => {
    console.log("Submit");
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container-background">
          <div className="row">
            <div className="card-panel center auth-card">
              {" "}
              <div className="title-page">Log in</div>
              <form className="login-form" onSubmit={this.handleSubmit}>
                <div className="input-field col s12">
                  <input
                    type="text"
                    id="user-login"
                    className="form-input-fields"
                    value={this.state.login}
                    onChange={this.handleChange}
                  ></input>
                  <div className="login-error">{this.state.loginError}</div>
                  <label htmlFor="user-login">Username or email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    type="password"
                    id="user-password"
                    className="form-input-fields"
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></input>
                  <div className="login-error">{this.state.pwdError}</div>
                  <label htmlFor="user-password">Password</label>
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Login"
                  className="btn btn-submit-form"
                  disabled={!this.state.loginValid || !this.state.pwdValid}
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
