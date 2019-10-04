import React, { useState } from "react";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";
import Navbar from "../../components/navbar/NavBar";

const MoviePage = () => {

    const [moviePageState, setMoviePageState] = useState({
        isPlayer: false,
    });

    return (
        <div className="MoviePage">
            <Navbar />
            <p className="movieTitle"><strong>Movie Title</strong></p>
            <div className="player">
                <video controls>
                    <source
                        src="http://localhost:5000/movie/5d95c4a2562e78b6a52b8eb17777/tt0446750/720p/YTS"
                        type="video/webm"
                    />
                </video>
            </div>
            <div className="bottomStuff">
                <div className="commentSection">
                
                </div>
                <div className="infoSection">
                    <p>1989</p>
                    <p>98min</p>
                </div>
            </div>
        </div>
    );
}

export default withAuth(MoviePage);
