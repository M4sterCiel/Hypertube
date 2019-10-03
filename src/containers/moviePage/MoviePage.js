import React, { useState } from "react";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";

const MoviePage = () => {

    const [moviePageState, setMoviePage] = useState({
        isPlayer: false,
    });

    return (
        <div className="MoviePage">
            <div className="player">
                <video controls>
                    <source
                        src="http://localhost:5000/movie/5d95c4a2562e78b6a52b8eb1/tt0005077/720p/Popcorn Time"
                        type="video/webm"
                    />
                </video>
            </div>
        </div>
    );
    
}
export default withAuth(MoviePage);
