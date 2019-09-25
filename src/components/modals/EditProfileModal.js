import React, { useEffect, useState } from "react";
import { Modal, Select } from "react-materialize";
import "./Modals.scss";
import UserPictureModify from "../../components/pictures/UserPictureModify";
import {
  FunctionButtonRegular,
  FunctionButtonSecondary
} from "../../components/buttons/Buttons";

const EditProfileModal = props => {
  const [user, setUser] = useState(props.user);

  const handleInputChange = e => {
    console.log(e.target);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handlePicture = picture => {
    console.log(picture);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(user);
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
              {" "}
              <input
                type="text"
                id="username"
                name="username"
                className="form-input-fields-modal"
                value={user.username}
                onChange={handleInputChange}
              ></input>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="form-input-fields-modal half-input-fields-modal field-right-margin"
                value={user.firstname}
                onChange={handleInputChange}
              ></input>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="form-input-fields-modal half-input-fields-modal"
                value={user.lastname}
                onChange={handleInputChange}
              ></input>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input-fields-modal"
                value={user.email}
                onChange={handleInputChange}
              ></input>
              <div className="profile-select-language">
                <p className="profile-select-language-text">Language: </p>
                <Select
                  value={user.language}
                  onChange={handleInputChange}
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
            <FunctionButtonSecondary text="cancel" />
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
