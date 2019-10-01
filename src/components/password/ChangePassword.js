import React, { useState } from "react"
import ValidateInput from "../../services/ValidateInput";
import Infotoast from "../../services/toasts/InfoToasts";
import ErrorToast from "../../services/toasts/ErrorToasts";
import axios from "axios";

const initialState = {
    pwd1: "",
    pwd2: "",
    pwd2Error: "",
    pwd1Valid: false,
    pwd1VerifyBox: "box-disabled",
    pwdHasLowercase: false,
    pwdHasUppercase: false,
    pwdHasNumber: false,
    pwdHasMinLen: false
}

const ChangePassword = (props) => {
    const [pwd, setPwd] = useState(initialState);

    const handleChange = e => {
        let result;
        if (e.target.id === "pwd1") {
            result = ValidateInput.user("passwordHard", e.target.value);
            setPwd({ ...result, [e.target.id]: e.target.value });
        } else {
            setPwd({ ...pwd, [e.target.id]: e.target.value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        
        await axios.post("/users/change-password", {
            username: props.username,
            pwd1: pwd.pwd1,
            pwd2: pwd.pwd2
          })
        .then(res => {
            if (res.data.status === "success") {
                Infotoast.custom.info("New password is set", 4000);
                props.closePasswordSwitch();
            }
        })
        .catch(err => {
            ErrorToast.custom.error(err.response.data.error, 4000);
        });
    }

    return (
        <div className="change-password-block"><form
        className="reset-password-form"
        onSubmit={handleSubmit}
      >
        <div className="input-field col s12">
          <input
            type="password"
            id="pwd1"
            className="form-input-fields"
            onChange={handleChange}
            onFocus={e =>
              setPwd({ ...pwd, pwd1VerifyBox: "box-enabled" })
            }
            onBlur={e =>
              setPwd({ ...pwd, pwd1VerifyBox: "box-disabled" })
            }
            required
          />
          <div
            className={"password-message " + pwd.pwd1VerifyBox}
          >
            <h3 id="pwd1-verify-title">
              Password must contain the following:
            </h3>
            <p
              id="letter"
              className={
                pwd.pwdHasLowercase ? "valid" : "invalid"
              }
            >
              A <b>lowercase</b> letter
            </p>
            <p
              id="capital"
              className={
                pwd.pwdHasUppercase ? "valid" : "invalid"
              }
            >
              A <b>capital (uppercase)</b> letter
            </p>
            <p
              id="number"
              className={pwd.pwdHasNumber ? "valid" : "invalid"}
            >
              A <b>number</b>
            </p>
            <p
              id="length"
              className={pwd.pwdHasMinLen ? "valid" : "invalid"}
            >
              Minimum <b>8 characters</b>
            </p>
          </div>
          <label className="label-form" htmlFor="pwd1">
            Password
          </label>
        </div>
        <div className="input-field col s12">
          <input
            type="password"
            id="pwd2"
            className="form-input-fields"
            onChange={handleChange}
          ></input>
          <div className="register-error">
            {pwd.pwd2 !== pwd.pwd1 &&
            pwd.pwd2 !== ""
              ? "Passwords don't match"
              : ""}
          </div>
          <label className="label-form" htmlFor="pwd2">
            Repeat password
          </label>
        </div>
        <input
          type="submit"
          name="submit"
          value="Change"
          className="btn btn-submit-form"
          disabled={
            !pwd.pwd1Valid || pwd.pwd2 !== pwd.pwd1
          }
        />
      </form>
      </div>
    )
}

export default ChangePassword;