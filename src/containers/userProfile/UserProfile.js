import React, { useReducer, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import UserPictureView from "../../components/pictures/UserPictureView";
import "./UserProfile.scss";

const initialState = {
  sendingRequest: false,
  requestReceived: false,
  data: [],
  status: ""
};

const testUser = {
  firstname: "toto",
  lastname: "martin",
  username: "toto123",
  profile_picture:
    "https://www.cats.org.uk/media/1400/choosing-a-cat.jpg?width=1600",
  email: "toto@email.tatta"
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
        data: testUser,
        status: "Received"
      };
    case "USER_UPDATE_REQUEST":
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        data: [],
        status: "Pending..."
      };
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        data: action.payload,
        status: "Updated"
      };
    default:
      return state;
  }
};

const UserProfile = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "USER_PROFILE_SUCCESS",
      payload: testUser
    });
  }, []);

  const { data } = state;

  return (
    <div className="App">
      <NavBar />
      <div className="row">
        <div className="col s12">
          <div className="user-profile">
            <div className="user-profile-picture">
              <span>{data.username}</span>
              <UserPictureView picture_url={data.profile_picture} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
