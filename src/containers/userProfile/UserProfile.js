import React, { useReducer, useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import withAuth from "../../services/withAuth";
import UserPictureView from "../../components/pictures/UserPictureView";
import "./UserProfile.scss";
import { FunctionButtonSecondary } from "../../components/buttons/Buttons";
import MoviesPosters from "../../components/lists/MoviesPosters";
import UsersList from "../../components/lists/UsersList";
import { ModalButtonSecondary } from "../../components/buttons/ModalButtons";
import EditProfileModal from "../../components/modals/EditProfileModal";
import { GlobalContext } from "../../context/GlobalContext";
import InfoToast from "../../services/toasts/InfoToasts";
import ErrorToast from "../../services/toasts/ErrorToasts";
import AuthService from "../../services/AuthService";
import axios from "axios";

const initialState = {
    sendingRequest: false,
    requestReceived: false,
    data: [],
    status: ""
};

const languages = {
    en: "English",
    fr: "Français",
    es: "Español"
};

const reducer = (state, action) => {
    switch (action.type) {
        case "USER_PROFILE_REQUEST":
            return {
                ...state,
                sendingRequest: true,
                requestReceived: false,
                data: [],
                status: "Pending..."
            };
        case "USER_PROFILE_SUCCESS":
            return {
                ...state,
                sendingRequest: false,
                requestReceived: true,
                data: action.payload,
                status: "Received"
            };
        default:
            return state;
    }
};

const UserProfile = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [updating, setUpdating] = useState(false);
    const [followingUser, setFollowingUser] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const user = useContext(GlobalContext);
    const Auth = new AuthService();
    let url = document.location.href;
    let username = url.split("/");
    username = decodeURI(username[username.length - 1]);

    const userUpdate = () => {
        setUpdating(true);
    };

    const handleFollow = async () => {
        if (!buttonDisabled) {
            setButtonDisabled(true);
            setTimeout(() => setButtonDisabled(false), 4000);
            if (!updating) {
                var token = await Auth.getToken();

                await axios
                    .post(
                        "/users/follow",
                        { username },
                        { headers: { Authorization: token } }
                    )
                    .then(async res => {
                        await user.updateFollowing(res.data.followingList);
                        await setFollowingUser(true);
                        InfoToast.custom.info("Following user", 4000);
                    })
                    .catch(err => {
                        ErrorToast.custom.error(err.response.data.error, 4000);
                    });
            } else {
                ErrorToast.custom.error("Impossible to follow user...", 4000);
            }
        } else {
            InfoToast.custom.info("Hold on :)", 4000);
        }
    };

    const handleUnfollow = async () => {
        if (!buttonDisabled) {
            setButtonDisabled(true);
            setTimeout(() => setButtonDisabled(false), 4000);
            if (!updating) {
                var token = await Auth.getToken();

                await axios
                    .post(
                        "/users/unfollow",
                        { username },
                        { headers: { Authorization: token } }
                    )
                    .then(async res => {
                        await user.updateFollowing(res.data.followingList);
                        await setFollowingUser(false);
                        InfoToast.custom.info("Unfollowing user", 4000);
                    })
                    .catch(err => {
                        ErrorToast.custom.error(err.response.data.error, 4000);
                    });
            } else {
                ErrorToast.custom.error("Impossible to unfollow user...", 4000);
            }
        } else {
            InfoToast.custom.info("Hold on :)", 4000);
        }
    };

    useEffect(() => {
        dispatch({
            type: "USER_PROFILE_REQUEST"
        });
        if (user.username !== "") {
            if (user.username === username) {
                dispatch({
                    type: "USER_PROFILE_SUCCESS",
                    payload: user
                });
            } else if (!updating) {
                axios
                    .get(`/users/get-profile/${username}`)
                    .then(res => {
                        dispatch({
                            type: "USER_PROFILE_SUCCESS",
                            payload: { ...res.data, locale: res.data.language }
                        });
                        setFollowingUser(user.following.includes(res.data._id));
                    })
                    .catch(err => {
                        props.history.push("/search");
                        ErrorToast.custom.error("User not found", 4000);
                    });
            }
        }
    }, [user, username]);

    const { data } = state;

    return (
        <div className="App">
            <NavBar />
            <div className="container-black">
                <div className="row">
                    <div className="col s12">
                        <div className="user-profile">
                            <div className="user-profile-info">
                                <div className="user-profile-info-picture col l2 m4 s12 col-padding-zero">
                                    {" "}
                                    <UserPictureView
                                        picture_url={data.picture}
                                    />
                                </div>
                                <div className="user-profile-info-text col l10 m8 s12">
                                    <p className="user-profile-info-text-big">
                                        {data.username}
                                    </p>
                                    <p className="user-profile-info-text-regular text-first-letter-capital">
                                        {data.firstname + " " + data.lastname}
                                    </p>
                                    <p className="user-profile-info-text-regular">
                                        {"Preferred language: " +
                                            languages[data.locale]}
                                    </p>
                                    {user.username !== "" &&
                                    user.username === username ? (
                                        <ModalButtonSecondary
                                            text="EDIT"
                                            tooltip="Edit your profile"
                                            href="edit-profile-modal"
                                        />
                                    ) : !followingUser ? (
                                        <FunctionButtonSecondary
                                            text="follow"
                                            func={handleFollow}
                                            tooltip="Click to follow user"
                                        />
                                    ) : (
                                        <FunctionButtonSecondary
                                            text="unfollow"
                                            func={handleUnfollow}
                                            tooltip="Click to unfollow user"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="user-profile-movies-seen">
                                {" "}
                                <p className="user-profile-info-text-big">
                                    Movies seen{" "}
                                    <span className="user-profile-info-text-regular">
                                        {`(${
                                            data.movies_seen
                                                ? data.movies_seen.length
                                                : 0
                                        })`}
                                    </span>
                                </p>
                                {data.movies_seen ? (
                                    <MoviesPosters movies={data.movies_seen} />
                                ) : (
                                    <p className="no-movies-message">
                                        No movies seen yet
                                    </p>
                                )}
                            </div>
                            {data.following && (
                                <div className="user-profile-following">
                                    <p className="user-profile-info-text-big">
                                        Following{" "}
                                        <span className="user-profile-info-text-regular">
                                            {`(${
                                                data.following
                                                    ? data.following.length
                                                    : 0
                                            })`}
                                        </span>
                                    </p>
                                    <UsersList users={data.following} />
                                </div>
                            )}
                        </div>
                    </div>
                    {data.username === username && (
                        <EditProfileModal user={data} update={userUpdate} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default withAuth(withRouter(UserProfile));
