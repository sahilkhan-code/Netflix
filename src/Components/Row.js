import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import { useNavigate } from "react-router-dom";

function Row(props) {
  console.log(props)
  const { title, fetchReq, isLargeRow } = props;
  const [movie, setMovie] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  const navigate = useNavigate();

  useEffect(() => {
    const getPopular = async () => {
      const response = await axios.get(fetchReq);
      setMovie(response.data.results);
    };
    getPopular();
  }, [fetchReq]);

  const movieHandler = (movie) => {
    navigate("/movie", { state: { movie } });
  };

  return (
    <div className="row">
      {movie && (
        <>
          <h2>{title}</h2>
          <div className="card">
            {movie.map((item) => (
              <div
                onClick={() => {
                  movieHandler(item);
                }}
                className="imageContainer"
              >
                <img
                  key={movie.id}
                  // className="image"
                  className={isLargeRow ? "image" : "smallrow"}
                  src={`${imageUrl}${
                    isLargeRow ? item.poster_path : item.backdrop_path
                  }`}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Row;
