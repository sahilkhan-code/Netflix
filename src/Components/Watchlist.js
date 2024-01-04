import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import "./Favourite.css";
import images from "../images/images";
import "./Watchlist.css"

function Watchlist() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/account/20845727/watchlist/movies",
        params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yjc3Y2I0MzU4YTQyYmI2MjFhZmQxOTZkYzU5M2Q1MyIsInN1YiI6IjY1ODI3ZjdmY2E4MzU0NDI0NGQ2Y2ZmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_iN9LZpiQw5vtcdHDzCBqEbJNIOk5yskW_5y8vkAqM",
        },
      };

      try {
        const response = await axios.request(options);
        console.log("get", response);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching Watchlist movies:", error);
        throw error;
      }
    };

    fetchFavoriteMovies();
  }, []);

  const movieHandler = (movie) => {
    navigate("/movie", { state: { movie } });
  };

  const watchListHandler = async (id) => {
    try {
      await axios.post(
        "https://api.themoviedb.org/3/account/20845727/watchlist",
        {
          media_type: "movie",
          media_id: id,
          watchlist: false,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yjc3Y2I0MzU4YTQyYmI2MjFhZmQxOTZkYzU5M2Q1MyIsInN1YiI6IjY1ODI3ZjdmY2E4MzU0NDI0NGQ2Y2ZmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_iN9LZpiQw5vtcdHDzCBqEbJNIOk5yskW_5y8vkAqM",
          },
        }
      );

      setMovies((prevMovies) => prevMovies.filter((item) => item.id !== id));
      console.log(movies)
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div className="topContainer" style={{ height: movies.length > 0 ? '100%' : '70vh' }}
    >
      <div className="row">
      <h2>WatchList</h2>
        {movies && movies.length > 0 ? (
          <>
            <div className={"cards"}>
              {movies.map((item) => (
                <div key={item.id} style={{marginBottom:20}}>
                  <div
                    onClick={() => {
                      movieHandler(item);
                    }}
                    className="imageContainer"
                  >
                    <img
                      className={"image"}
                      src={`${imageUrl}${item.poster_path}`}
                      alt={item.title}
                    />
                  </div>
                  <div
                    onClick={() => {
                        watchListHandler(item.id)
                    }}
                    className={"watchlist"}
                  >
                   <div>
                    Remove
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ):(
          <div className="addNew"
          >
            Nothing in WatchList
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
