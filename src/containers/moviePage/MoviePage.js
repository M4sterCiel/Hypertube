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
                        src="http://localhost:5000/movie/5d95c4a2562e78b6a52b8eb1/tt3700392/720p/YTS"
                        type="video/webm"
                    />
                </video>
            </div>
        );
    }
}
export default withAuth(MoviePage);
