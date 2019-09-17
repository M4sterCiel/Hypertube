import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./containers/App";
import Login from "./containers/login/Login";
import Register from "./containers/register/Register";
import Search from "./containers/search/Search";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}
