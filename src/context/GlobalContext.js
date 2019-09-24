import React, { createContext, Component } from "react";

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
  state = {
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

  render() {
    return (
      <GlobalContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
export default GlobalContextProvider;
