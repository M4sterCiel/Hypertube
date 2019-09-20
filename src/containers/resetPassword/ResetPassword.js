import React, { Component } from "react";
import NavBar from "../../components/navbar/NavBar";
import ValidateInput from "../../services/ValidateInput";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd1: "",
      pwd2: "",
      pwd2Error: "",
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

  handleChange = e => {
    let result;
    if (e.target.id === "pwd1") {
      result = ValidateInput.user("passwordHard", e.target.value);
    }

    this._isMounted &&
      this.setState({ [e.target.id]: e.target.value, ...result });
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
              <div className="title-page">Reset password</div>
              <form
                className="reset-password-form"
                onSubmit={this.handleSubmit}
              >
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
                  value="Reset"
                  className="btn btn-submit-form"
                  disabled={
                    !this.state.pwd1Valid || this.state.pwd2 !== this.state.pwd1
                  }
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
