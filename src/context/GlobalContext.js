import React, { createContext, Component } from "react";
import axios from "axios";
import AuthService from "../services/AuthService";

export const GlobalContext = createContext({
  locale: "en",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  uid: "",
  picture: "",
  setLocale: () => {},
  updateContext: () => {}
});

class GlobalContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "en",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      uid: "",
      picture: "",
      setLocale: data => this.setState({ locale: data }),
      updateContext: data =>
        this.setState({
          locale: data.locale,
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: "",
          uid: data.username,
          picture: data.picture
        })
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    var token = await this.Auth.getToken();
    if (token) {
      axios
        .get("/users/session", { headers: { Authorization: token } })
        .then(res => {
          this.setState({
            locale: res.data.language ? res.data.language : "en",
            username: res.data.username ? res.data.username : "",
            fisrtname: res.data.fisrtname ? res.data.fisrtname : "",
            lastname: res.data.lastname ? res.data.lastname : "",
            email: res.data.email ? res.data.email : "",
            uid: res.data._id ? res.data._id : "",
            picture: res.data.picture ? res.data.picture : ""
          });
        });
    }
  }

  render() {
    return (
      <GlobalContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
export default GlobalContextProvider;
