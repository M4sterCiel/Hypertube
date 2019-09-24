import decode from "jwt-decode";
import ErrorToast from "./toasts/ErrorToasts";
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

export default class AuthService {
  static contextType = GlobalContext;
  // Setting token in local storage
  setToken(tokenData) {
    localStorage.setItem("Token", tokenData);
  }

  // Getting token from local storage
  async getToken() {
    return await localStorage.getItem("Token");
  }

  // Checking if token exists and is still valid
  loggedIn = async () => {
    const token = await this.getToken();
    if (!token) {
      ErrorToast.custom.error(
        "You have to be logged to access this page!",
        4000
      );
      return false;
    }
    var valid = false;
    await axios
      .get("/users/session", { headers: { Authorization: token } })
      .then(res => {
        console.log(res.data._id);
        var data = {
          locale: res.data.language ? res.data.language : "en",
          username: res.data.username ? res.data.username : "",
          fisrtname: res.data.fisrtname ? res.data.fisrtname : "",
          lastname: res.data.lastname ? res.data.lastname : "",
          email: res.data.email ? res.data.email : "",
          uid: res.data._id ? res.data._id : "",
          picture: res.data.picture ? res.data.picture : ""
        };
        console.log(this.context);
        //this.context.updateContext(data);
        if (res.data._id) valid = true;
      })
      .catch(err => {
        ErrorToast.custom.error(
          "You have to be logged to access this page!",
          4000
        );
        return false;
      });
    return !!token && !this.isTokenExpired(token) && valid;
  };

  // Checking if token is still valid
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Removing token from local storage
  async logout() {
    const token = await this.getToken();
    if (token)
      await axios
        .get("/users/logout", { headers: { Authorization: token } })
        .then(res => {
          console.log(res.data);
        });
    localStorage.removeItem("Token");
  }

  // Getting the data saved in the token
  getConfirm = () => {
    let answer = decode(this.getToken());
    return answer;
  };
}
