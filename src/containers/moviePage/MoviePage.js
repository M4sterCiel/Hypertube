import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";
import Navbar from "../../components/navbar/NavBar";
import axios from "axios";
import ErrorToast from "../../services/toasts/ErrorToasts";

const MoviePage = (props) => {

    const [moviePageState, setMoviePageState] = useState({
        isPlayer: false,
        loaded: false,
        subEn: undefined,
        subEs: undefined,
        subFr: undefined
    });

    const [movieDetails, setMovieDetails] = useState({ movie: []});

    // const sourcesList = [
    //     'Sources',
    //     'YTS 720p',
    //     'YTS 1080p',
    //     'POPCORN TIME 720p',
    //   ]

    useEffect(() => {
        const fetchMovies = async () => {
            let url = document.location.href;
            let split = url.split("/");
            let imdbId = {id: split[4]};
            try {
                const res = await axios.post("/search/singleMovie", imdbId);
                if (res.data.length !== 0) {
                    setMovieDetails({ movie: res.data[0], validId: true });
                } else {
                    setMovieDetails({ validId: false });
                }
            } catch (err) {
                if (err.response && err.response.status === 401)
                    console.log(err.response);
            }
        };
        if (movieDetails.validId === false) {
            props.history.push("/search");
            ErrorToast.custom.error("Movie not found", 4000);
        }
        fetchMovies();
    }, [movieDetails]);

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
                <p className="movieTitle"><strong>{movieDetails.movie.title}</strong></p>
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
                    <div className="infoSection">
                        <div className="poster">
                            <img className="infoPoster" src={movieDetails.movie.poster}></img>
                        </div>
                        <div className="infos">
                            <p className="movieSecondary">Theater release:</p>
                            <p className="moviePrimary">{movieDetails.movie.year}</p>
                            <p className="movieSecondary">Running time:</p>
                            <p className="moviePrimary">{movieDetails.movie.runtime}</p>
                            <p className="movieSecondary">Director:</p>
                            <p className="moviePrimary">Deedee Megadoodoo</p>
                            <p className="movieSecondary">Starring:</p>
                            <p className="moviePrimary">Joe Fyn, Sarah Beltion, Ed Fill</p>
                            <p className="movieSecondary">Synopsis:</p>
                            <p>{movieDetails.movie.plot}</p>
                        </div>
                    </div>
                    <div className="commentSection">
                        <div className="comments">
                            <div className="singleComment">
                                <div className="top">
                                    <p className="moviePrimary" id="commenter"><strong>Maxime</strong></p>
                                    <p className="movieSecondary" id="timestamp">01/12/2019 at 12:34</p>
                                </div>
                                <div className="bottom">
                                    <p className="movieSecondary" id="content">Amazing movie</p>
                                </div>
                            </div>
                        </div>
                        <form className="inputComment">
                            <div className="input-field col s12">
                                <textarea id="textarea1" className="materialize-textarea"></textarea>
                                <label for="textarea1">Enter your comment</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(withRouter(MoviePage));
