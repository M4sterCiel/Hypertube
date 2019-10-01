import React, { useReducer, useState, useContext } from "react";
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
import { GlobalContext } from "../../context/GlobalContext";
import AuthService from "../../services/AuthService";
import ChangePassword from "../../components/password/ChangePassword";
import axios from "axios";

const initialState = {
  sendingRequest: false,
  requestReceived: false,
  data: [],
  status: ''
};

const initialValidation = {
  firstnameError: "",
  firstnameValid: true,
  lastnameError: "",
  lastnameValid: true,
  usernameError: "",
  usernameValid: true,
  emailError: "",
  emailValid: true,
  pictureValid: true
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        data: [],
        status: 'Pending...'
      };
    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        data: action.payload,
        status: 'Updated'
      };
    default:
      return state;
  }
};

const EditProfileModal = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const context = useContext(GlobalContext);
  const [user, setUser] = useState(props.user);
  const [passwordSwitch, setPasswordSwitch] = useState(false);
  const [error, setError] = useState(initialValidation);
  const event = new KeyboardEvent("keydown", { keyCode: 27 });
  const Auth = new AuthService();

  const handleChange = e => {
    const { name, value } = e.target;

    if (name !== "locale") {
      let result = ValidateInput.user(name, value);
      setError({ ...error, ...result });
    }

    setUser({ ...user, [name]: value.toLowerCase() });
  };

  const handlePicture = picture => {
    if (picture.status && picture.url) {
      setError({ ...error, pictureValid: true });
      setUser({ ...user, picture: picture.url });
    } else {
      setError({ pictureValid: false });
    }
  };

  const handleCancel = e => {
    document.dispatchEvent(event);
    setUser(props.user);
    setError(initialValidation);
  }

  const handlePasswordSwitch = () => {
    setPasswordSwitch(!passwordSwitch);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    dispatch({
      type: 'USER_UPDATE_REQUEST'
    });

    if (
      error.firstnameValid &&
      error.lastnameValid &&
      error.usernameValid &&
      error.emailValid &&
      error.pictureValid
    ) {
      if (!CheckObjectsEquivalence(user, props.user)) {
        var token = await Auth.getToken();
        var data = { ...(user.username.toLowerCase() !== props.user.username.toLowerCase() && { username: user.username.toLowerCase()}), 
        ...(user.firstname.toLowerCase() !== props.user.firstname.toLowerCase() && { firstname: user.firstname.toLowerCase()}), 
        ...(user.lastname.toLowerCase() !== props.user.lastname.toLowerCase() && { lastname: user.lastname.toLowerCase()}),
        ...(user.email.toLowerCase() !== props.user.email.toLowerCase() && { email: user.email.toLowerCase()}),
        ...(user.locale !== props.user.locale && { language: user.locale}),
        ...(user.picture !== props.user.picture && { img: user.picture})};
        
        axios.post("/users/update", {...data} , { headers: { Authorization: token }})
        .then(res => {context.updateContext({ locale: user.locale, username: user.username.toLowerCase(), firstname: user.firstname.toLowerCase(), lastname: user.lastname.toLowerCase(), email: user.email.toLowerCase(), picture: user.picture });
        InfoToast.custom.info("Saved", 4000);
        document.dispatchEvent(event);})
        .catch(err => ErrorToast.custom.error(err.response.data.error, 4000));
      } else {
        InfoToast.custom.info("Nothing changed", 4000);
      }
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
              picture={user.picture}
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
                className={`form-input-fields-modal half-input-fields-modal field-right-margin text-first-letter-capital ${
                  error.firstnameValid ? "" : "edit-profile-invalid-input"
                }`}
                value={user.firstname}
                onChange={handleChange}
              ></input>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className={`form-input-fields-modal half-input-fields-modal text-first-letter-capital ${
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
                  value={user.locale}
                  onChange={handleChange}
                  name="locale"
                >
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
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
              func={handleCancel}
            />
          </span>
          <span className="profile-edit-actions-buttons">
            <FunctionButtonSecondary text="delete account" />
          </span>
          <span className="profile-edit-actions-buttons">
            <FunctionButtonSecondary text="password" func={handlePasswordSwitch} />
          </span>
        </div>
        {passwordSwitch && <ChangePassword username={user.username} closePasswordSwitch={handlePasswordSwitch} />}
      </div>
    </Modal>
  );
};

export default EditProfileModal;
