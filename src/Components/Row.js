import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import { useNavigate } from "react-router-dom";

function Row(props) {
  const { title, fetchReq, isLargeRow } = props;
  const [movie, setMovie] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  const navigate = useNavigate();

  useEffect(() => {
    const getPopular = async () => {
      const response = await axios.get(fetchReq);
      setMovie(response.data.results);
      console.log(response);
    };
    getPopular();
  }, [fetchReq]);

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
          favorite: true,
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

      console.log(response);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="row">
      {movie && (
        <>
          <h2>{title}</h2>
          <div className={isLargeRow ? "card" : "cardSmall"}>
            {movie.map((item) => (
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
                    className={isLargeRow ? "image" : "smallrow"}
                    src={`${imageUrl}${
                      isLargeRow ? item.poster_path : item.backdrop_path
                    }`}
                  />
                </div>
                <div
                  onClick={() => {
                    favHandler(item.id);
                  }}
                  className={isLargeRow ? "favourite" : "favouritesmall"}
                >
                  Make Favourite
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Row;
