import React from "react";
import "./Buttons.scss";
import { Button } from "react-materialize";
import { NavLink } from "react-router-dom";

const LoginButton = () => {
  return (
    <NavLink to="/login">
      <Button tooltip="Log on HyperFlix" className="btn-regular modal-trigger">
        <span className="btn-regular-text">Log In</span>
      </Button>
    </NavLink>
  );
};

const RegisterButton = () => {
  return (
    <NavLink to="/register">
      <Button
        tooltip="Register on HyperFlix"
        className="btn-regular modal-trigger"
      >
        <span className="btn-regular-text">Register</span>
      </Button>
    </NavLink>
  );
};

export { LoginButton, RegisterButton };
