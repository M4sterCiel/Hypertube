import React, { useState, useEffect } from "react";
import "./pictures.scss";
import ValidatePicture from "../../services/ValidatePicture";
import ErrorToast from "../../services/toasts/ErrorToasts";
import DefaultUserPic from "../../assets/default_user.png";

const UserPictureModify = props => {
  const [pictureValid, setPictureValid] = useState(false);
  const [picture, setPicture] = useState(DefaultUserPic);

  useEffect(() => {
    if (props.picture) {
      setPicture(props.picture);
      setPictureValid(true);
      return;
    }
  }, [props.picture]);

  const handlePictureUpload = e => {
    let file = e.target.files[0];

    if (file === undefined) {
      return;
    }
    if (!ValidatePicture.picture.format(file)) {
      ErrorToast.custom.error("Please upload a correct image format", 1400);
      return;
    }
    if (!ValidatePicture.picture.size(file)) {
      ErrorToast.custom.error(
        "Please upload a correct image (less than 2mb)",
        1400
      );
      return;
    }

    let pic = new Image();
    pic.src = window.URL.createObjectURL(file);
    pic.onerror = () => {
      ErrorToast.custom.error("Please upload a correct image", 1400);
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
          setPictureValid(true);
          props.pictureToParent({ status: true, url: reader.result });
        };
        reader.readAsDataURL(file);
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
