import React, { Component } from "react";
import AuthService from "../services/AuthService";

// HOC to wrap component and verify authentication
export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
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

    componentWillUnmount() {
      //console.log('closing socket');
    }

    render() {
      if (this.state.loaded === true) {
        //console.log("confirmed!");
        return (
          <AuthComponent
            history={this.props.history}
            confirm={this.state.confirm}
            //socket={this.state.socket}
          />
        );
      } else {
        return null;
      }
    }
  };
}
