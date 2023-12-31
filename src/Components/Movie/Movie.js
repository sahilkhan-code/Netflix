import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios";
import requests, { API_KEY, token } from "../../requests";
import "./Movie.css";
import images from "../../images/images";
import Row from "../Row";
import Navbar from "../Navbar/Navbar";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import Modal from "../Modal";
import SuccessAlert from "../SuccessAlert";

function Movie(props) {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const movieid = location.state.movie.id;
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US&api_key=${API_KEY}`
        );
        setData(response.data);
        setLoading(false);
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

  const isWatchlist = (id) => {
    return watchListMovies.some((movie) => movie.id === id);
  };

  const watchListHandler = async (id) => {
    setWatchListMovies((prevWatchListMovies) => {
      setVisible(true);
      if (isWatchlist(id)) {
        return prevWatchListMovies.filter(
          (watchListMovie) => watchListMovie.id !== id
        );
      } else {
        return [...prevWatchListMovies, { id }];
      }
    });
    setTimeout(() => {
      setVisible(false);
    }, 1000);
    try {
      const response = await axios.post(
        requests.watchlist,
        {
          media_type: "movie",
          media_id: id,
          watchlist: !isWatchlist(id),
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      <Modal isLoading={loading} />
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
            <SuccessAlert visible={visible} />

            <p style={{ filter: "brightness(100%)" }} className="topTitle">
              {data?.title || data?.name || data?.original_name}
            </p>
            <div className="genres">
              {new Date(data.release_date).getFullYear()} |{" "}
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: 5,
                  padding: 2,
                  paddingRight: 5,
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
                <button
                  onClick={() => {
                    navigate("/favourite");
                  }}
                  className="banner_button"
                >
                  + My List
                </button>
                <button
                  onClick={() => watchListHandler(data.id)}
                  className="watchlistButton"
                >
                  Add to WatchList
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
      <div className="fadeBannerMovie"></div>
      <div className="`descMovie`" style={{ margin: 20 }}>
        <span style={{ fontSize: 25, fontWeight: 700 }}> OverView</span>
        <h1 className="description">{data?.overview}</h1>
      </div>
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
