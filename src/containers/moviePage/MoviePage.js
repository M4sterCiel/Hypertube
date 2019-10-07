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
    axios.get("/movie/getSubtitles/tt0112442").then(res => {
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
        <p className="movieTitle">
          <strong>7 Days To Vegas</strong>
        </p>
        <div className="player">
          <video className="videoSource" controls width="800px">
            <source
              src="http://localhost:5000/movie/5d97526305879de15bbbd9ec/tt0112442/720p/YTS"
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
            <div className="comments">
              <div className="singleComment">
                <div className="top">
                  <p className="moviePrimary" id="commenter">
                    <strong>Maxime</strong>
                  </p>
                  <p className="movieSecondary" id="timestamp">
                    01/12/2019 at 12:34
                  </p>
                </div>
                <div className="bottom">
                  <p className="movieSecondary" id="content">
                    Amazing movie
                  </p>
                </div>
              </div>
            </div>
            <form class="inputComment">
              <div class="row">
                <div class="input-field col s12">
                  <textarea
                    id="textarea1"
                    class="materialize-textarea"
                  ></textarea>
                  <label for="textarea1">Enter your comment</label>
                </div>
              </div>
            </form>
          </div>
          <div className="infoSection">
            <div className="topBox">
              <img
                className="infoPoster"
                src="https://img.yts.lt/assets/images/movies/7_days_to_vegas_2019/large-cover.jpg"
              ></img>
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
            <p>
              After a mobster agrees to cooperate with an FBI investigation in
              order to stay out of prison, he's relocated by the authorities to
              a life of suburban anonymity as part of a witness protection
              program. It's not long before a couple of his new neighbours
              figure out his true identity and come knocking to see if he'd be
              up for one more hit—suburban style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MoviePage);
