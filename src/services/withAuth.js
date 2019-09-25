import React, { Component } from "react";
import AuthService from "../services/AuthService";

// HOC to wrap component and verify authentication
export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    state = {
      loaded: false
    };

    async componentDidMount() {
      if (!(await Auth.loggedIn())) {
        Auth.logout();
        this.props.history.replace("/login");
      } else {
        this.setState({
          loaded: true
        });
      }
    }

    componentWillUnmount() {}

    render() {
      if (this.state.loaded === true) {
        return <AuthComponent history={this.props.history} />;
      } else {
        return null;
      }
    }
  };
}
