import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";
import InfoToast from "../../services/toasts/InfoToasts";
import ErrorToast from "../../services/toasts/ErrorToasts";
import axios from "axios";

class Activation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
  }

  componentDidMount() {
    let key = document.location.href;
    key = key.split("=");
    key = key[key.length - 1];
    let username = document.location.href;
    username = username.split("=");
    username = username[username.length - 2].split("&", -1)[0];

    axios
      .post("/users/activation", {
        username: username,
        key: key
      })
      .then(res => {
        if (res.data.status)
          InfoToast.custom.info("Your account is now ready!", 4000);
        if (res.data.message) ErrorToast.custom.error(res.data.message, 4000);
        this.props.history.push("/login");
      })
      .catch(err => {
        ErrorToast.custom.error(err.response.data.error, 4000);
        this.props.history.push("/login");
      });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default Activation;
