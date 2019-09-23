import React, { Component } from "react";
import NavBar from "../../components/navbar/NavBar";
import ValidateInput from "../../services/ValidateInput";
import ErrorToast from "../../services/toasts/ErrorToasts";
import axios from "axios";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      loginError: "",
      loginValid: false
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = e => {
    let result = ValidateInput.user("login", e.target.value);
    this._isMounted &&
      this.setState({
        login: e.target.value,
        loginValid: result.loginValid,
        loginError: result.loginError
      });
  };

  handleSubmit = async e => {
    e.preventDefault();
    axios
      .post("/users/forgot-password", {
        login: this.state.login
      })
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
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
              <div className="title-page">Forgot password</div>
              <form
                className="forgot-password-form"
                onSubmit={this.handleSubmit}
              >
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
                    Username or email
                  </label>
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Retrieve"
                  className="btn btn-submit-form"
                  disabled={!this.state.loginValid}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
