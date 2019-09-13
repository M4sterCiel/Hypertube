import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./containers/App";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App}/>
        </Switch>
      </div>
    </Router>
  );
}