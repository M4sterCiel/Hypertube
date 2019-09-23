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

const FunctionButtonRegular = ({ text, tooltip, func }) => {
  return (
    <Button
      tooltip={tooltip}
      className="btn-regular btn-function"
      onClick={func}
    >
      <span className="btn-function-text">{text.toUpperCase()}</span>
    </Button>
  );
};

const FunctionButtonSecondary = ({ text, tooltip, func }) => {
  return (
    <Button
      tooltip={tooltip}
      className="btn-secondary btn-function"
      onClick={func}
    >
      <span className="btn-function-text">{text.toUpperCase()}</span>
    </Button>
  );
};

export {
  LoginButton,
  RegisterButton,
  FunctionButtonRegular,
  FunctionButtonSecondary
};
