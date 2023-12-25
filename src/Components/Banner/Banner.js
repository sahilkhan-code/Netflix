import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getBannerData = async () => {
      const response = await axios.get(requests.getPopularMovie);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      console.log("rr", movie);
    };
    getBannerData();
  }, []);
  function truncate(str,n){
    console.log(str)
    return str?.length > n ? str.substr(0,n-1) + "..." : str;
  }
  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        // marginTop:-22,
      }}
    >
      <div className="headerContent">
        <h1 className="title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="headerButtons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="desc">{truncate(movie?.overview,150)}</h1>
      </div>
    </header>
  );
}

export default Banner;
