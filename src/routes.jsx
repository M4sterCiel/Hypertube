import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./containers/App";
import Login from "./containers/login/Login";
import Register from "./containers/register/Register";
import Search from "./containers/Search";
import ResetPassword from "./containers/resetPassword/ResetPassword";
import ForgotPassword from "./containers/forgotPassword/ForgotPassword";
import UserCompletePicture from "./containers/userCompletePicture/UserCompletePicture";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route
            exact
            path="/user-complete-picture"
            component={UserCompletePicture}
          />
        </Switch>
      </div>
    </Router>
  );
}
