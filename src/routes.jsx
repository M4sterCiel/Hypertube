import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./containers/App";
import Login from "./containers/login/Login";
import Register from "./containers/register/Register";
import Activation from "./containers/activation/Activation";
import ResetPassword from "./containers/resetPassword/ResetPassword";
import ForgotPassword from "./containers/forgotPassword/ForgotPassword";
import UserCompletePicture from "./containers/userCompletePicture/UserCompletePicture";
import UserProfile from "./containers/userProfile/UserProfile";
import Search from "./containers/search/Search";
import ActivateOauth from "./containers/activation/activateOauth";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/activation" component={Activation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/activateOauth" component={ActivateOauth} />
          <Route
            exact
            path="/user-complete-picture"
            component={UserCompletePicture}
          />
          <Route exact path="/user-profile" component={UserProfile} />
        </Switch>
      </div>
    </Router>
  );
}
