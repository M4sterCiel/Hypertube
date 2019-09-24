import React from "react";
import { Modal, Select } from "react-materialize";
import "./Modals.scss";
import UserPictureModify from "../../components/pictures/UserPictureModify";
import {
  FunctionButtonRegular,
  FunctionButtonSecondary
} from "../../components/buttons/Buttons";

const EditProfileModal = () => {
  const handlePicture = picture => {
    console.log(picture);
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
                className="form-input-fields-modal"
                value="toto"
                onChange={() => console.log("toto")}
              ></input>
              <input
                type="text"
                id="firstname"
                className="form-input-fields-modal half-input-fields-modal field-right-margin"
                value="toto"
                onChange={() => console.log("toto")}
              ></input>
              <input
                type="text"
                id="lastname"
                className="form-input-fields-modal half-input-fields-modal"
                value="toto"
                onChange={() => console.log("toto")}
              ></input>
              <input
                type="email"
                id="email"
                className="form-input-fields-modal"
                value="toto"
                onChange={() => console.log("toto")}
              ></input>
              <div className="profile-select-language">
                <p className="profile-select-language-text">Language: </p>
                <Select value="EN" onChange={() => console.log("toto")}>
                  <option value="0">English</option>
                  <option value="1">Français</option>
                  <option value="2">Español</option>
                </Select>
              </div>
            </form>
          </div>
        </div>
        <div className="profile-edit-actions">
          <span className="profile-edit-actions-buttons">
            <FunctionButtonRegular text="save" />
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
