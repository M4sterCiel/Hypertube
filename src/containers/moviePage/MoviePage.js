import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";
import Navbar from "../../components/navbar/NavBar";
import Loading from "../../components/loadingAnim/LoadingFullScreen";
import axios from "axios";
import ErrorToast from "../../services/toasts/ErrorToasts";
import { GlobalContext } from "../../context/GlobalContext";

const MoviePage = (props) => {

    const [moviePageState, setMoviePageState] = useState({
        isPlayer: false,
        loaded: false,
        subEn: undefined,
        subEs: undefined,
        subFr: undefined
    });

    const context = useContext(GlobalContext);
    const [movieId, setMovieId] = useState("");
    const [movieDetails, setMovieDetails] = useState({ movie: [], sources: []});
    const [commentInputValue, setCommentInputValue] = useState("");
    const [commentValue, setCommentValue] = useState({
        userId: 0,
        movieImdbId: 0,
        content: "",
        timestamp: Date,
    });
    const [streamURL, setStreamURL] = useState("");

    useEffect(() => {
        let isMounted = true;
        const fetchMovies = async () => {
            let url = document.location.href;
            let split = url.split("/");
            let imdbId = {id: split[4]};
            isMounted && setMovieId(imdbId);
            try {
                const movieRes = isMounted && await axios.post("/search/singleMovie", imdbId);
                const omdbComplementaryDataRes = isMounted && await axios.post(`http://www.omdbapi.com/?i=${imdbId.id}&apikey=bb5842e5`);
                if (movieRes.data.length !== 0) {
                    let sourcesList = movieRes.data[0].torrents;
                    if (sourcesList.length > 0)
                    {
                        let i = 0;
                        let tmp = [];
                        while (i < sourcesList.length) {
                            tmp[i] = sourcesList[i].quality.concat(' ', sourcesList[i].source);
                            i++;
                        }
                        tmp.unshift("Source");
                        if (omdbComplementaryDataRes.data) {
                            if (omdbComplementaryDataRes.data.Director && omdbComplementaryDataRes.data.Actors)
                                isMounted && setMovieDetails({ movie: movieRes.data[0], sources: tmp, director: omdbComplementaryDataRes.data.Director, casting: omdbComplementaryDataRes.data.Actors, validId: true });
                        } else {
                            isMounted && setMovieDetails({ movie: movieRes.data[0], sources: tmp, director: "Deedee Megadoodoo", casting: "Hugh Mungus, Bette Davis, Sarah Connor", validId: true });
                        }
                    }
                } else {
                    isMounted && setMovieDetails({ validId: false });
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
        if (movieDetails.validId !== false && movieDetails.movie.length <= 0)
        {
            isMounted && fetchMovies();
        }
        return () => isMounted = false;
    }, [movieDetails, props.history]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted && movieId.id) {
            !moviePageState.loaded && isMounted &&
            axios.get(`/movie/getSubtitles/${movieId.id}`).then(res => {
                isMounted && setMoviePageState({
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
        }
        return () => isMounted = false;
    }, [movieId, moviePageState.loaded]);

    useEffect(() => {
        let isMounted = true;
        const saveComment = async () => {
            try {
                console.log("commentValue = ", commentValue)
                const res = isMounted && await axios.post("/comment/addComment", commentValue);
                if (res.data.status === 'success')
                    console.log("successfully saved comment :)");
            } catch (err) {
                if (err.response && err.response.status === 401)
                console.log(err.response);
            }
        };
        saveComment();
        return () => isMounted = false;
    }, [commentValue]);

    const constructURL = e => {
        let userId = context.uid;
        let movieId = movieDetails.movie.imdbId;
        let params = e.target.value.split(' ');
        let quality = params[0];
        let source = params[1] === 'Popcorn' ? params[1].concat(' ', params[2]) : params[1];
        let route = "http://localhost:5000/movie";
        let url = route.concat('/', userId).concat('/', movieId).concat('/', quality).concat('/', source);
        setStreamURL(url);
    }

    const handleNewComment = e => {
        setCommentInputValue(e.target.value)
    }

    const saveComment = e => {
        e.preventDefault();
        let date = Date();
        setCommentValue({userId: context.uid, movieImdbId: movieDetails.movie.imdbId, content: commentInputValue, timestamp: date});
        resetInputField();
    }

    const resetInputField = () => {
        setCommentInputValue("");
    };

    const deleteComment = () => {

    }

    return (
        <div className="MoviePage">
            <Navbar />
            {movieDetails.validId === true ? (
                <div className="layer">
                <p className="movieTitle"><strong>{movieDetails.movie.title}</strong></p>
                {streamURL ? (
                    <div className="player">
                    <video className="videoSource" controls>
                        <source
                            src={streamURL}
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
                ) : (
                    <p>Select a source below to start streaming the movie</p>
                )}
                <div className="bottomStuff">
                    <div className="infoSection">
                        <div className="poster">
                            <img className="infoPoster" alt="movie poster" src={movieDetails.movie.poster}></img>
                        </div>
                        <div className="infos">
                            {movieDetails.sources.length > 0 ? (
                                 <select className="browser-default"
                                 id="sourceSelect"
                                 onChange={constructURL}
                                >
                                    {movieDetails.sources.map(source => (
                                        <option key={source} 
                                                value={source} 
                                        >
                                            {source}
                                        </option>
                                    ))}
                                </select>
                            ) : ( 
                            <p>No source available for this file</p>
                            )}

                            <p className="movieSecondary">Theater release:</p>
                            <p className="moviePrimary">{movieDetails.movie.year}</p>
                            <p className="movieSecondary">Running time:</p>
                            <p className="moviePrimary">{movieDetails.movie.runtime}</p>
                            <p className="movieSecondary">Director:</p>
                            <p className="moviePrimary">{movieDetails.director}</p>
                            <p className="movieSecondary">Starring:</p>
                            <p className="moviePrimary">{movieDetails.casting}</p>
                            <p className="movieSecondary">Synopsis:</p>
                            {movieDetails.movie.plot && movieDetails.movie.plot.length > 330 ? (
                                <p id="synopsis" className="moviePrimary">{movieDetails.movie.plot.substring(0, 330) + "..."}</p>
                            ) : (
                                <p id="synopsis" className="moviePrimary">{movieDetails.movie.plot}</p>
                            )}
                        </div>
                    </div>
                    <div className="commentSection">
                        <div className="comments">
                            <div className="singleComment">
                                <div className="top">
                                    <p className="moviePrimary" id="commenter"><strong>Maxime</strong></p>
                                    {/* if comment.userId === userId */}
                                    <a href="#" onClick={deleteComment} className="deleteButton">
                                        <p className="moviePrimary" id="deleteButton"><strong>x</strong></p>
                                    </a>
                                    <p className="movieSecondary" id="timestamp">01/12/2019 at 12:34</p>
                                </div>
                                <div className="bottom">
                                    <p className="movieSecondary" id="content">Amazing movie</p>
                                </div>
                                <hr className="commentSeparator"></hr>
                            </div>
                        </div>
                        <form className="inputComment">
                            <input
                                value={commentInputValue}
                                onChange={handleNewComment}
                                type="text"
                                maxLength="100"
                                className="comment-input-field s1"
                                placeholder="Enter your comment"
                            />
                            <button
                                disabled={commentValue.length < 4}
                                onClick={saveComment}
                                type="submit"
                                id="submitCommentButton"
                                className="btn btn-secondary btn-medium waves-effect"
                                value="submit"
                            >
                                SEND
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            ) : (
                <Loading></Loading>
            )}
        </div>
    );
};

export default withAuth(withRouter(MoviePage));

