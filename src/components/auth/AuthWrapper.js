import React, { Component } from "react";
import AuthService from "../../services/AuthService";

// HOC to wrap component and verify authentication
export default function withAuth(AuthComponent) {
  const Auth = new AuthService();

  return class AuthWrapped extends Component {
    state = {
      confirm: null,
      loaded: false,
      socket: ""
    };

    async componentDidMount() {
      if (!Auth.isTokenValid()) {
        this.props.history.replace("/users/login");
      } else if (!Auth.isSessionValid()) {
        this.props.history.replace("/users/login");
      } else {
        try {
          const confirm = await Auth.getConfirm();
          this.setState({
            confirm: confirm,
            loaded: true
          });
        } catch (err) {
          console.log(err);
          Auth.logout();
          this.props.history.replace("/users/login");
        }
      }
    }

    componentWillUnmount() {
      if (this.state.socket) this.state.socket.close();
    }

    render() {
      if (this.state.loaded === true) {
        if (this.state.confirm) {
          return (
            <AuthComponent
              history={this.props.history}
              confirm={this.state.confirm}
            />
          );
        } else {
          console.log("not confirmed!");
          return null;
        }
      } else {
        return null;
      }
    }
  };
}
