import React, { useReducer, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import UserPictureView from "../../components/pictures/UserPictureView";
import "./UserProfile.scss";
import { FunctionButtonSecondary } from "../../components/buttons/Buttons";
import MoviesPosters from "../../components/lists/MoviesPosters";
import UsersList from "../../components/lists/UsersList";
import { ModalButtonSecondary } from "../../components/buttons/ModalButtons";
import EditProfileModal from "../../components/modals/EditProfileModal";

const initialState = {
  sendingRequest: false,
  requestReceived: false,
  data: [],
  status: ""
};

const testUser = {
  firstname: "Firstname",
  lastname: "Lastname",
  username: "Username",
  profile_picture:
    "https://www.cats.org.uk/media/1400/choosing-a-cat.jpg?width=1600",
  email: "toto@email.tatta",
  language: "FR",
  movies_seen: [
    {
      id: 1,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 2,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 3,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 4,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 5,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 6,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 7,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 8,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 9,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    },
    {
      id: 10,
      title: "Toto",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg"
    }
  ],
  following: [
    {
      id: 1,
      username: "toto",
      picture:
        "https://www.petmd.com/sites/default/files/the-cat-which-sleeps-picture-id596060186.jpg"
    },
    {
      id: 2,
      username: "toto2",
      picture:
        "https://www.petmd.com/sites/default/files/the-cat-which-sleeps-picture-id596060186.jpg"
    },
    {
      id: 3,
      username: "totodwedewdewdewdewdwedewdwedwedwed3",
      picture:
        "https://www.petmd.com/sites/default/files/the-cat-which-sleeps-picture-id596060186.jpg"
    },
    {
      id: 4,
      username: "toto4",
      picture:
        "https://www.petmd.com/sites/default/files/the-cat-which-sleeps-picture-id596060186.jpg"
    }
  ]
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
      <div className="container-black">
        <div className="row">
          <div className="col s12">
            <div className="user-profile">
              <div className="user-profile-info">
                <div className="user-profile-info-picture col l2 m4 s12 col-padding-zero">
                  {" "}
                  <UserPictureView picture_url={data.profile_picture} />
                </div>
                <div className="user-profile-info-text col l10 m8 s12">
                  <p className="user-profile-info-text-big">{data.username}</p>
                  <p className="user-profile-info-text-regular">
                    {data.firstname + " " + data.lastname}
                  </p>
                  <p className="user-profile-info-text-regular">
                    {"Preferred language: " + data.language}
                  </p>
                  {/*                   <FunctionButtonSecondary
                    text="follow"
                    func={() => console.log("toto")}
                    tooltip="Click to follow user"
                  /> */}
                  <ModalButtonSecondary
                    text="EDIT"
                    tooltip="Edit your profile"
                    href="edit-profile-modal"
                  />
                </div>
              </div>
              <div className="user-profile-movies-seen">
                {" "}
                <p className="user-profile-info-text-big">
                  Movies seen{" "}
                  <span className="user-profile-info-text-regular">
                    {`(${data.movies_seen ? data.movies_seen.length : 0})`}
                  </span>
                </p>
                {data.movies_seen ? (
                  <MoviesPosters movies={data.movies_seen} />
                ) : (
                  <p className="no-movies-message">No movies seen yet</p>
                )}
              </div>
              {data.following && (
                <div className="user-profile-following">
                  <p className="user-profile-info-text-big">
                    Following{" "}
                    <span className="user-profile-info-text-regular">
                      {`(${data.following ? data.following.length : 0})`}
                    </span>
                  </p>
                  <UsersList users={data.following} />
                </div>
              )}
            </div>
          </div>
          <EditProfileModal />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
