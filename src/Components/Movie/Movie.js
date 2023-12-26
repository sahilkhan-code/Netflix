import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios";
// import requests from '../../requests'
import { API_KEY } from "../../requests";
import "./Movie.css";
import images from "../../images/images";

function Movie(props) {
  const [data, setData] = useState();

  const location = useLocation();
  const movieid = location.state.movie.id;
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieid}?language=en-US&api_key=${API_KEY}`
        );
        //   console.log('Movie Details:', response);
        setData(response.data);
        //   console.log(data)
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieid]);
  useEffect(() => {
    console.log("Updated Data:", data);
  }, [data]);

  return (
    <div>
      {data && (
        <header
          className="header"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            marginTop: -22,
          }}
        >
          <div className="headerContent">
            <p className="topTitle">
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
            <h1 className="description">{data?.overview}</h1>
            <div className="buttons">
              <div className="headerButton">
                <img className="playbutton" src={images.play} />
                <button className="trailerButton">Play Trailer</button>
              </div>
              <div className="headerButtons">
                <button className="banner_button">+ My List</button>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}

export default Movie;
