import React, { Component } from "react";
import "./Login.scss";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";

class Login extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="login-page">
          <div className="root">
            <div className="card-panel center auth-card">
              {" "}
              <div className="title-page">Log in</div>
              <form className="login-form">
                <input
                  type="text"
                  id="user-login"
                  className="form-input-fields"
                ></input>
                <label htmlFor="user-login">Username or email</label>
                <input
                  type="text"
                  id="user-password"
                  className="form-input-fields"
                ></input>
                <label htmlFor="user-password">Password</label>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
