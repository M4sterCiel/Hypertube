import React, { useState } from "react";
import withAuth from "../../services/withAuth";
import "./MoviePage.scss";
import Navbar from "../../components/navbar/NavBar";

const MoviePage = () => {

    const [moviePageState, setMoviePageState] = useState({
        isPlayer: false,
    });

    const subtitlesList = [
        'Subtitles',
        'English',
        'French',
      ]

    return (
        <div className="MoviePage">
            <Navbar />
            <div className="layer">
                <p className="movieTitle"><strong>7 Days To Vegas</strong></p>
                <div className="player">
                    <video controls>
                        <source
                            // src="http://localhost:5000/movie/5d95c4a2562e78b6a52b8eb1/tt0005077/720p/Popcorn Time"
                            type="video/webm"
                        />
                    </video>
                </div>
                <div className="options">
                    <select className="browser-default"
                        id="subtitlesSelect"
                        // onChange={handleGenreChanges}
                    >
                    {subtitlesList.map(lang => (
                    <option key={lang} 
                        value={lang} 
                    >
                        {lang}
                    </option>
                    ))}
                    </select>
                </div>
                <div className="bottomStuff">
                    <div className="commentSection">
                        <p>/* Comment section */</p>
                    </div>
                    <div className="infoSection">
                        <img className="infoPoster" src="https://img.yts.lt/assets/images/movies/7_days_to_vegas_2019/large-cover.jpg"></img>
                        <p>1989</p>
                        <p>98min</p>
                        <p>Directed by Samuel Kraftman</p>
                        <p>After a mobster agrees to cooperate with an FBI investigation in order to stay out of prison, he's relocated by the authorities to a life of suburban anonymity as part of a witness protection program. It's not long before a couple of his new neighbours figure out his true identity and come knocking to see if he'd be up for one more hit—suburban style.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(MoviePage);
