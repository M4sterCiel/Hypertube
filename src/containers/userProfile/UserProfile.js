import React, { useReducer, useEffect, useContext } from 'react';
import NavBar from '../../components/navbar/NavBar';
import UserPictureView from '../../components/pictures/UserPictureView';
import './UserProfile.scss';
import { FunctionButtonSecondary } from '../../components/buttons/Buttons';
import MoviesPosters from '../../components/lists/MoviesPosters';
import UsersList from '../../components/lists/UsersList';
import { ModalButtonSecondary } from '../../components/buttons/ModalButtons';
import EditProfileModal from '../../components/modals/EditProfileModal';
import { GlobalContext } from '../../context/GlobalContext';
import axios from "axios";

const initialState = {
  sendingRequest: false,
  requestReceived: false,
  data: [],
  status: ''
};

const languages = {
  en: 'English',
  fr: 'Français',
  es: 'Español'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_PROFILE_REQUEST':
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        data: [],
        status: 'Pending...'
      };
    case 'USER_PROFILE_SUCCESS':
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        data: action.payload,
        status: 'Received'
      };
    case 'USER_UPDATE_REQUEST':
      return {
        ...state,
        sendingRequest: true,
        requestReceived: false,
        data: [],
        status: 'Pending...'
      };
    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        sendingRequest: false,
        requestReceived: true,
        data: action.payload,
        status: 'Updated'
      };
    default:
      return state;
  }
};

const UserProfile = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = useContext(GlobalContext);

  useEffect(() => {
    let url = document.location.href;
    let username = url.split('/');
    username = username[username.length - 1];

    dispatch({
      type: 'USER_PROFILE_REQUEST'
    });

    if (user.username === username) {
      dispatch({
        type: 'USER_PROFILE_SUCCESS',
        payload: user
      });
    } else {
      console.log(username);
      axios.get('/users/get', {username: username}).then(res => {
        console.log(res.data);
      })
    }
  }, [user]);

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
                  {' '}
                  <UserPictureView picture_url={data.picture} />
                </div>
                <div className="user-profile-info-text col l10 m8 s12">
                  <p className="user-profile-info-text-big">{data.username}</p>
                  <p className="user-profile-info-text-regular">
                    {data.firstname + ' ' + data.lastname}
                  </p>
                  <p className="user-profile-info-text-regular">
                    {'Preferred language: ' + languages[data.locale]}
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
                {' '}
                <p className="user-profile-info-text-big">
                  Movies seen{' '}
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
                    Following{' '}
                    <span className="user-profile-info-text-regular">
                      {`(${data.following ? data.following.length : 0})`}
                    </span>
                  </p>
                  <UsersList users={data.following} />
                </div>
              )}
            </div>
          </div>
          {data.username && <EditProfileModal user={data} />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
