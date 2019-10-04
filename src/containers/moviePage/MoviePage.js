import React, { useState } from "react";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";
import Navbar from "../../components/navbar/NavBar";
import axios from "axios";

const MoviePage = () => {

    const [moviePageState, setMoviePageState] = useState({
        isPlayer: false,
        loaded: false,
        subEn: undefined,
        subEs: undefined,
        subFr: undefined
    });

    !moviePageState.loaded &&
        axios.get("/movie/getSubtitles/tt0446750").then(res => {
            setMoviePageState({
                subEn:
                    res.data.subPathEn !== undefined
                        ? require("../../" + res.data.subPathEn.substr(-26))
                        : undefined,
                subEs:
                    res.data.subPathEs !== undefined
                        ? require("../../" + res.data.subPathEs.substr(-26))
                        : undefined,
                subFr:
                    res.data.subPathFr !== undefined
                        ? require("../../" + res.data.subPathFr.substr(-26))
                        : undefined,
                loaded: true
            });
        });

    return (
        <div className="MoviePage">
            <Navbar />
            <div className="layer">
                <p className="movieTitle"><strong>7 Days To Vegas</strong></p>
                <div className="player">
                    <video className="videoSource" controls>
                        <source
                            // src="http://localhost:5000/movie/5d95c4a2562e78b6a52b8eb17777/tt0446750/720p/YTS"
                            type="video/webm"
                        />
                        {moviePageState.subEn !== undefined ? (
                            <track
                                label="English"
                                kind="subtitles"
                                srcLang="en"
                                src={moviePageState.subEn}
                            />
                        ) : (
                            ""
                        )}
                        {moviePageState.subFr !== undefined ? (
                            <track
                                label="Français"
                                kind="subtitles"
                                srcLang="fr"
                                src={moviePageState.subFr}
                            />
                        ) : (
                            ""
                        )}
                        {moviePageState.subEs !== undefined ? (
                            <track
                                label="Español"
                                kind="subtitles"
                                srcLang="es"
                                src={moviePageState.subEs}
                            />
                        ) : (
                            ""
                        )}
                    </video>
                </div>
                <div className="bottomStuff">
                    <div className="commentSection">
                        <p>/* Comment section */</p>
                    </div>
                    <div className="infoSection">
                        <div className="topBox">
                            <img className="infoPoster" src="https://img.yts.lt/assets/images/movies/7_days_to_vegas_2019/large-cover.jpg"></img>
                            <div className="rightSide">
                            <p className="movieSecondary">Theater release:</p>
                                <p className="moviePrimary">1989</p>
                                <p className="movieSecondary">Running time:</p>
                                <p className="moviePrimary">98min</p>
                                <p className="movieSecondary">Director:</p>
                                <p className="moviePrimary">Samuel Kraftman</p>
                            </div>
                        </div>
                        <p className="movieSecondary">Synopsis:</p>
                        <p>After a mobster agrees to cooperate with an FBI investigation in order to stay out of prison, he's relocated by the authorities to a life of suburban anonymity as part of a witness protection program. It's not long before a couple of his new neighbours figure out his true identity and come knocking to see if he'd be up for one more hit—suburban style.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(MoviePage);
