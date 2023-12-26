import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
import { API_KEY } from "../../requests";
import "./Movie.css";
import images from "../../images/images";
import Row from "../Row";
import Navbar from "../Navbar/Navbar";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Movie(props) {
  const [data, setData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  const location = useLocation();
  const movieid = location.state.movie.id;
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US&api_key=${API_KEY}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
    setTrailerUrl("");
  }, [movieid]);
  useEffect(() => {}, [data]);
  const morelikethis = `https://api.themoviedb.org/3/movie/${movieid}/similar?language=en-US&page=1&api_key=${API_KEY}`;
  const recommended = `https://api.themoviedb.org/3/movie/${movieid}/recommendations?language=en-US&page=1&api_key=${API_KEY}`;

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (data) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(data?.title || data?.name || data?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      <Navbar />
      {data && (
        <header
          className="headers"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            marginTop: -22,
          }}
        >
          <div className="headerContent">
            <p style={{ filter: "brightness(100%)" }} className="topTitle">
              {data?.title || data?.name || data?.original_name}
            </p>
            <div className="genres">
              {new Date(data.release_date).getFullYear()} |{" "}
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: 2,
                  padding: 1,
                  paddingRight: 2,
                }}
              >
                {data.runtime} min
              </span>
              {data.genres.map((genre) => (
                <span key={genre.id}> | {genre.name} </span>
              ))}
            </div>
            <div className="buttons">
              <div onClick={() => handleClick(data)} className="headerButton">
                <img className="playbutton" src={images.play} />
                <button className="trailerButton">Play Trailer</button>
              </div>
              <div className="headerButtons">
                <button className="banner_button">+ My List</button>
                <button className="watchlistButton">Add to WatchList</button>
              </div>
            </div>
          </div>
        </header>
      )}
      <div className="fadeBanner"></div>
      <div style={{ margin: 20 }}>
        <span style={{ fontSize: 25, fontWeight: 700 }}> OverView</span>
        <h1 className="description">{data?.overview}</h1>
      </div>
      {(trailerUrl)}
      {trailerUrl ? <YouTube videoId={trailerUrl} opts={opts} /> : null}

      <div className="morelikethis">
        <Row
          title={"More Like This"}
          fetchReq={morelikethis}
          isLargeRow={true}
        />
        <Row title={"Recommended"} fetchReq={recommended} isLargeRow={true} />
      </div>
    </div>
  );
}

export default Movie;
