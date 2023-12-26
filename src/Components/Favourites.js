import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import "./Favourite.css"

function Favourites() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/account/20845727/favorite/movies",
        params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Yjc3Y2I0MzU4YTQyYmI2MjFhZmQxOTZkYzU5M2Q1MyIsInN1YiI6IjY1ODI3ZjdmY2E4MzU0NDI0NGQ2Y2ZmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_iN9LZpiQw5vtcdHDzCBqEbJNIOk5yskW_5y8vkAqM",
        },
      };

      try {
        const response = await axios.request(options);
        // console.log(response.data);
        setMovies(response.data.results);
        console.log(movies);
        return response.data; // Return the data if needed
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
        throw error;
      }
    };
    fetchFavoriteMovies();
  }, [movies]);
  const movieHandler = (movie) => {
    navigate("/movie", { state: { movie } });
  };
  const favHandler = async (id) => {
    try {
      const response = await axios.post(
        "https://api.themoviedb.org/3/account/20845727/favorite",
        {
          media_type: "movie",
          media_id: id,
          favorite: false,
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

    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="topContainer">
      <Navbar />
      <div className="row" style={{ paddingTop: 100 }}>
        {movies && (
          <>
            <h2>Favourites</h2>
            <div className={"card"}>
              {movies.map((item) => (
                <div>
                  <div
                    onClick={() => {
                      movieHandler(item);
                    }}
                    className="imageContainer"
                  >
                    <img
                      key={item.id}
                      // className="image"
                      className={"image"}
                      src={`${imageUrl}${item.poster_path}`}
                    />
                  </div>
                  <div style={{marginTop:10}}
                    onClick={() => {
                      favHandler(item.id);
                    }}
                    className={"favourite"}
                  >
                    Remove Favourite
                  </div>
                  </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favourites;
