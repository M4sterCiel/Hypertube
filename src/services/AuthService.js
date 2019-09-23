import decode from "jwt-decode";
import ErrorToast from "./toasts/ErrorToasts";
import axios from "axios";

export default class AuthService {
  // Setting token in local storage
  setToken(tokenData) {
    localStorage.setItem("Token", tokenData);
  }

  // Getting token from local storage
  getToken() {
    return localStorage.getItem("Token");
  }

  // Checking if token exists and is still valid
  async loggedIn() {
    const token = this.getToken();
    var valid = false;
    await axios
      .get("/users/session", { headers: { Authorization: token } })
      .then(res => {
        if (res.data._id) valid = true;
      })
      .catch(err => {
        ErrorToast.custom.error(err.response.data.error, 4000);
        return false;
      });
    return !!token && !this.isTokenExpired(token) && valid;
  }

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
    const token = this.getToken();
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