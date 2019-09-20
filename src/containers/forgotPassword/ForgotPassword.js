import React, { Component } from "react";
import NavBar from "../../components/navbar/NavBar";
import ValidateInput from "../../services/ValidateInput";

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
    console.log("Submit");
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
