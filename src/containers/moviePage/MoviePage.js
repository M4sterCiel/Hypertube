import React, { useState } from "react";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";
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
            <div className="player">
                <video controls>
                    <source
                        src="http://localhost:5000/movie/5d95c4a2562e78b6a52b8eb17777/tt0446750/720p/YTS"
                        type="video/webm"
                    />
                    <track
                        label="English"
                        kind="subtitles"
                        srcLang="en"
                        src={moviePageState.subEn}
                    />
                    <track
                        label="Français"
                        kind="subtitles"
                        srcLang="fr"
                        src={moviePageState.subFr}
                    />
                    <track
                        label="Español"
                        kind="subtitles"
                        srcLang="es"
                        src={moviePageState.subEs}
                    />
                </video>
            </div>
        </div>
    );
};

export default withAuth(MoviePage);
