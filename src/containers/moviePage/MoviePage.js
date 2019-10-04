import React, { useState } from "react";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";

const MoviePage = () => {

    const [moviePageState, setMoviePageState] = useState({
        isPlayer: false,
    });

    return (
        <div className="MoviePage">
            <div className="player">
                <video controls>
                    <source
                        src="http://localhost:5000/movie/5d95c4a2562e78b6a52b8eb17777/tt0446750/720p/YTS"
                        type="video/webm"
                    />
                </video>
            </div>
        </div>
    );
}

export default withAuth(MoviePage);
