import React, { useState } from "react";
import "./pictures.scss";
import ValidatePicture from "../../services/ValidatePicture";
import ErrorToast from "../../services/toasts/ErrorToasts";
import DefaultUserPic from "../../assets/default_user.png";

const UserPictureModify = () => {
  const [pictureValid, setPictureValid] = useState(false);
  const [picture, setPicture] = useState(DefaultUserPic);

  const handlePictureUpload = e => {
    let file = e.target.files[0];

    if (file === undefined) {
      setPictureValid(false);
      return;
    }
    if (!ValidatePicture.picture.format(file)) {
      ErrorToast.custom.error("Please upload a correct image format", 1400);
      setPictureValid(false);
      setPicture(DefaultUserPic);
      return;
    }
    if (!ValidatePicture.picture.size(file)) {
      ErrorToast.custom.error(
        "Please upload a correct image (less than 2mb)",
        1400
      );
      setPictureValid(false);
      setPicture(DefaultUserPic);
      return;
    }

    let pic = new Image();
    pic.src = window.URL.createObjectURL(file);
    pic.onerror = () => {
      ErrorToast.custom.error("Please upload a correct image", 1400);
      setPictureValid(false);
      setPicture(DefaultUserPic);
      return;
    };
    pic.onload = () => {
      let width = pic.naturalWidth;
      let height = pic.naturalHeight;
      window.URL.revokeObjectURL(pic.src);
      if (width && height) {
        var reader = new FileReader();
        reader.onloadend = () => {
          setPicture(reader.result);
        };
        reader.readAsDataURL(file);
        setPictureValid(true);
      }
    };
  };

  return (
    <div className="user-picture-modify">
      <div
        className="user-picture-box"
        style={{ backgroundImage: "url(" + picture + ")" }}
      ></div>
      <div className="upload-options" onChange={e => handlePictureUpload(e)}>
        <label>
          <input type="file" className="image-upload" accept="image/*" />
          <i className="material-icons picture-edit-add-icon">
            {pictureValid ? "edit" : "add"}
          </i>
        </label>
      </div>
    </div>
  );
};

export default UserPictureModify;
