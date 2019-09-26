import React, { Component } from "react";
import withAuth from "../../services/withAuth";

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayer: false
    };
  }

  render() {
    return (
      <div className="player">
        <video controls>
          <source
            src="http://localhost:5000/movie/movie/Sample_1080.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    );
  }
}
export default withAuth(MoviePage);
