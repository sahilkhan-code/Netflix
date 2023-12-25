import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css"

function Row(props) {
  const { title, fetchReq,isLargeRow } = props;
  const [movie, setMovie] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const getPopular = async () => {
      const response = await axios.get(fetchReq);
        console.log(response);
      setMovie(response.data.results);
    };
    getPopular();
  }, [fetchReq]);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="card">
        {movie.map((item) => (
            <div className="imageContainer">
              <img key={movie.id} className="image" src={`${imageUrl}${isLargeRow ? item.poster_path : item.backdrop_path}`} />
            </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
