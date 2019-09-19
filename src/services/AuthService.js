import decode from "jwt-decode";

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
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
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
  logout() {
    localStorage.removeItem("Token");
  }

  // Getting the data saved in the token
  getConfirm = () => {
    let answer = decode(this.getToken());
    return answer;
  };
}
