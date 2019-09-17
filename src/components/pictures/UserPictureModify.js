import React, { useState } from "react";
import "./pictures.scss";

const UserPictureModify = () => {
  return (
    <div className="user-picture-modify">
      <div className="user-picture-box"> </div>
      <div
        className="upload-options"
        onChange={e => this.handlePictureSelect("index", e)}
      >
        <label>
          <input type="file" className="image-upload" accept="image/*" />
          <i className="material-icons picture-edit-add-icon">
            {"toto" !== "" ? "edit" : "add"}
          </i>
        </label>
      </div>
    </div>
  );
};

export default UserPictureModify;
