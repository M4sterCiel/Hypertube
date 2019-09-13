import React from "react";
import "./Buttons.scss";
import { Button } from "react-materialize";
import { NavLink } from "react-router-dom";

const LpBigButton = () => {
  return (
    <NavLink to="/register">
      <Button
        tooltip="Register on HyperFlix"
        className="btn-regular btn-big modal-trigger"
      >
        <span className="btn-regular-text">
          Try it now<i class="material-icons btn-big-icon">arrow_forward_ios</i>
        </span>
      </Button>
    </NavLink>
  );
};

export { LpBigButton };
