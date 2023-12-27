import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getBannerData = async () => {
      const response = await axios.get(requests.getPopularMovie);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
    };
    getBannerData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const movieHandler = (movie) => {
    navigate("/movie", { state: { movie } });
  };

  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        marginTop: -22,
      }}
    >
      <div className="headerContent">
        <h1 className="title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="headerButtons">
          <button
            onClick={() => {
              movieHandler(movie);
            }}
            className="banner_button"
          >
            Play
          </button>
          <button onClick={()=>{navigate("/favourite")}} className="banner_button">My List</button>
        </div>
        <h1 className="desc">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="fadeBanner"></div>
    </header>
  );
}

export default Banner;
