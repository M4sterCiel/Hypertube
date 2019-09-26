import React, { useEffect, useState } from "react";
import { Modal, Select } from "react-materialize";
import "./Modals.scss";
import UserPictureModify from "../../components/pictures/UserPictureModify";
import {
  FunctionButtonRegular,
  FunctionButtonSecondary
} from "../../components/buttons/Buttons";
import ValidateInput from "../../services/ValidateInput";
import InfoToast from "../../services/toasts/InfoToasts";
import ErrorToast from "../../services/toasts/ErrorToasts";
import CheckObjectsEquivalence from "../../services/CheckObjectsEquivalence";

const EditProfileModal = props => {
  const [user, setUser] = useState(props.user);
  const [error, setError] = useState({
    firstnameError: "",
    firstnameValid: true,
    lastnameError: "",
    lastnameValid: true,
    usernameError: "",
    usernameValid: true,
    emailError: "",
    emailValid: true,
    pictureValid: true
  });
  const event = new KeyboardEvent("keydown", { keyCode: 27 });

  const handleChange = e => {
    const { name, value } = e.target;

    if (name !== "language") {
      let result = ValidateInput.user(name, value);
      setError({ ...error, ...result });
    }

    setUser({ ...user, [name]: value });
    console.log(props.user);
  };

  const handlePicture = picture => {
    console.log(picture);
    if (picture.status && picture.url) {
      setError({ ...error, pictureValid: true });
      setUser({ ...user, profile_picture: picture.url });
    } else {
      setError({ pictureValid: false });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      error.firstnameValid &&
      error.lastnameValid &&
      error.usernameValid &&
      error.emailValid &&
      error.pictureValid
    ) {
      if (!CheckObjectsEquivalence(user, props.user)) {
        console.log("user", { ...user });
        console.log("props", { ...props.user });
        InfoToast.custom.info("Saved", 4000);
      } else {
        console.log("same");
        InfoToast.custom.info("Nothing changed", 4000);
      }
      document.dispatchEvent(event);
    } else {
      ErrorToast.custom.error("Incorrect field(s), cannot save", 4000);
    }
  };

  return (
    <Modal id="edit-profile-modal" className="modal-black-background">
      <div className="modal-black-container">
        <p className="modal-black-title">Edit profile</p>
        <div className="modal-black-content">
          <div className="profile-picture-modify col l2 m4 s12 col-padding-zero">
            <UserPictureModify
              picture="https://i.ytimg.com/vi/jpsGLsaZKS0/maxresdefault.jpg"
              pictureToParent={handlePicture}
            />
          </div>
          <div className="profile-text-modify col l10 m8 s12">
            <form className="edit-profile-form">
              <input
                type="text"
                id="username"
                name="username"
                className={`form-input-fields-modal ${
                  error.usernameValid ? "" : "edit-profile-invalid-input"
                }`}
                value={user.username}
                onChange={handleChange}
              ></input>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className={`form-input-fields-modal half-input-fields-modal field-right-margin  ${
                  error.firstnameValid ? "" : "edit-profile-invalid-input"
                }`}
                value={user.firstname}
                onChange={handleChange}
              ></input>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className={`form-input-fields-modal half-input-fields-modal  ${
                  error.lastnameValid ? "" : "edit-profile-invalid-input"
                }`}
                value={user.lastname}
                onChange={handleChange}
              ></input>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input-fields-modal  ${
                  error.emailValid ? "" : "edit-profile-invalid-input"
                }`}
                value={user.email}
                onChange={handleChange}
              ></input>
              <div className="profile-select-language">
                <p className="profile-select-language-text">Language: </p>
                <Select
                  value={user.language}
                  onChange={handleChange}
                  name="language"
                >
                  <option value="EN">English</option>
                  <option value="FR">Français</option>
                  <option value="ES">Español</option>
                </Select>
              </div>
            </form>
          </div>
        </div>
        <div className="profile-edit-actions">
          <span className="profile-edit-actions-buttons">
            <FunctionButtonRegular text="save" func={handleSubmit} />
          </span>
          <span className="profile-edit-actions-buttons">
            <FunctionButtonSecondary
              text="cancel"
              func={() => document.dispatchEvent(event)}
            />
          </span>
          <span className="profile-edit-actions-buttons">
            <FunctionButtonSecondary text="password" />
          </span>
          <span className="profile-edit-actions-buttons">
            <FunctionButtonSecondary text="delete account" />
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
