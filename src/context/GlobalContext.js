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
  loaded: false,
  setLocale: () => {},
  updateContext: () => {},
  resetContext: () => {}
});

class GlobalContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: "",
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      uid: "",
      picture: "",
      loaded: true,
      setLocale: data => this.setState({ locale: data }),
      updateContext: data =>
        this.setState({
          locale: data.locale,
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          picture: data.picture,
          loaded: true
        }),
        updatePicture: data => this.setState({
          picture: data
        }),
      resetContext: () =>
        this.setState({
          locale: this.state.locale,
          username: "",
          firstname: "",
          lastname: "",
          email: "",
          uid: "",
          picture: ""
        })
    };
    this.Auth = new AuthService();
  }

  async componentDidMount() {
    var token = await this.Auth.getToken();
    if (token && this.state.username === "") {
      await axios
        .get("/users/session", { headers: { Authorization: token } })
        .then(async res => {
          await this.setState({
            locale: res.data.language ? res.data.language : this.state.locale,
            username: res.data.username ? res.data.username : "",
            firstname: res.data.firstname ? res.data.firstname : "",
            lastname: res.data.lastname ? res.data.lastname : "",
            email: res.data.email ? res.data.email : "",
            uid: res.data._id ? res.data._id : "",
            picture: res.data.img ? res.data.img : "",
            loaded: true
          });
        })
        .catch(err => {
          console.log("Cannot update GlobalContext");
        });
    } else if (!token) {
      await this.setState({
        loaded: true
      });
    }
  }

  render() {
    return (
      <GlobalContext.Provider value={{ ...this.state }}>
        {this.state.loaded && this.props.children}
      </GlobalContext.Provider>
    );
  }
}
export default GlobalContextProvider;
