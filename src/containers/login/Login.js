import React, { Component } from "react";
import "./Login.scss";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";
import { NavLink } from "react-router-dom";
import AuthService from "../../services/AuthService";
import ValidateInput from "../../services/ValidateInput";
import TwitterLogo from "../../assets/Twitter_Logo_WhiteOnBlue.png";
import GoogleLogo from "../../assets/Google_Logo.png";
import GithubLogo from "../../assets/Github_Logo.png";
import SchoolLogo from "../../assets/42_Logo.png";
import axios from "axios";
import ErrorToast from "../../services/toasts/ErrorToasts";

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
    this.Auth = new AuthService();
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
    const isLogin = e.target.id === "user-login";
    const isPwd = e.target.id === "user-password";

    if (isLogin) {
      let result = ValidateInput.user("username", e.target.value);
      console.log(result);
      this._isMounted &&
        this.setState({
          login: e.target.value,
          loginValid: result.usernameValid,
          loginError: result.usernameError
        });
    }

    if (isPwd) {
      let result = ValidateInput.user("passwordSimple", e.target.value);
      this._isMounted &&
        this.setState({
          password: e.target.value,
          pwdValid: result.pwdValid,
          pwdError: result.pwdError
        });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    await axios
      .post("/users/login", {
        username: this.state.login,
        password: this.state.password
      })
      .then(res => {
        if (res.data.status === "success") {
          this.Auth.setToken(res.data.token);
          this.props.history.push("/search");
        } else ErrorToast.custom.error(res.data.msg, 4000);
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
            <div className="card-panel center auth-card">
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
                  <label className="label-form" htmlFor="user-login">
                    Username
                  </label>
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
                  <label className="label-form" htmlFor="user-password">
                    Password
                  </label>
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Login"
                  className="btn btn-submit-form"
                  disabled={!this.state.loginValid || !this.state.pwdValid}
                />
              </form>
              <div className="register-login-with-social">
                <p className="register-login-social-text">Or log with</p>
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
