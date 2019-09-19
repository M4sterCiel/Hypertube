import React, { Component } from "react";
import NavBar from "../../components/navbar/NavBar";
import UserPictureModify from "../../components/pictures/UserPictureModify";

class UserCompletePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureValid: false,
      pictureUrl: ""
    };
    this._isMounted = false;
    this.handlePicture = this.handlePicture.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    console.log(this.state.pictureValid);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = e => {
    console.log(e);
  };

  handlePicture = picture => {
    this._isMounted &&
      this.setState({
        pictureValid: picture.status,
        pictureUrl: picture.url
      });
  };

  handleSubmit = async e => {
    console.log("Submit");
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="container-background">
          <div className="row">
            <div className="card-panel center auth-card">
              <div className="title-page">Add picture</div>
              <form
                className="user-complete-picture"
                onSubmit={this.handleSubmit}
              >
                <div className="input-field col s12">
                  <UserPictureModify pictureToParent={this.handlePicture} />
                </div>
                <input
                  type="submit"
                  name="submit"
                  value="Complete profile"
                  className="btn btn-submit-form"
                  disabled={!this.state.pictureValid}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCompletePicture;
