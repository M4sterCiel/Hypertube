import React from "react"
import { Button } from "react-materialize";
import Infotoast from "../../../services/toasts/InfoToasts";
import ErrorToast from "../../../services/toasts/ErrorToasts";
import AuthService from "../../../services/AuthService";

import axios from "axios";

const DeleteAccount = (props) => {
    const Auth = new AuthService();

    const handleCancel = () => {
        props.closeDelAccountSwitch();
    }

    const handleDelete = async () => {
        var token = await Auth.getToken();
        await axios.delete("/users/delete", { headers: { Authorization: token }})
        .then(res => 
        { Auth.logout();
            Infotoast.custom.info("Account deleted", 4000);
            window.location.replace("/login");
        })
        .catch(err => ErrorToast.custom.error(err.response.data.error, 4000));
    }

    return (
        <div className="delete-account-form">
            <Button className="btn-secondary btn-full-width" onClick={handleCancel} >Cancel</Button>
            <Button className="btn-regular btn-full-width" onClick={handleDelete} >Delete</Button>
        </div>
    )
}

export default DeleteAccount;