import React, { Component } from "react";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "./LandingPage.scss";
import { Modal, Button } from "react-materialize";
import Navbar from "../navbar/NavBar";
import { withRouter } from "react-router-dom";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="landing-page">
          <div className="big-title row">
            <Modal
              header="Modal Header"
              trigger={
                <Button className="waves-effect waves-light btn modal-trigger m5">
                  LOGIN{" "}
                </Button>
              }
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </Modal>
            <Modal
              header="Modal Header"
              trigger={
                <Button className="waves-effect waves-light btn modal-trigger m5">
                  LOGIN{" "}
                </Button>
              }
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LandingPage);
