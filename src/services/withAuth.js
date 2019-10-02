import React, { Component } from "react";
import AuthService from "../services/AuthService";

// HOC to wrap component and verify authentication
export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    state = {
      validAuth: true
    };

    async componentDidMount() {
/*       if (!(await Auth.isTokenValid())) {
        this.setState({
          validAuth: false
        });
        this.props.history.replace("/login");
      } else if (!(await Auth.isSessionValid())) {
        Auth.logout();
        this.setState({
          validAuth: false
        });
        this.props.history.replace("/login"); */
        if (!await Auth.loggedIn()) {
          this.setState({
            validAuth: false
          });
          this.props.history.replace("/login");
      } else {
        this.setState({
          validAuth: true
        });
      }
    }

    render() {
      if (this.state.validAuth) {
        return <AuthComponent history={this.props.history} />;
      } else {
        return null;
      }
    }
  };
}
