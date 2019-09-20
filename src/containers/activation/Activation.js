import React, { Component } from "react";
import "materialize-css/dist/css/materialize.min.css";
import NavBar from "../../components/navbar/NavBar";
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
        console.log(res.data);
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response.data.status);
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
