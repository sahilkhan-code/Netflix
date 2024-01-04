import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import { useNavigate } from "react-router-dom";
import images from "../images/images";
import Modal from "./Modal";

function Row(props) {
  const { title, fetchReq, isLargeRow } = props;
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(fetchReq);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, [fetchReq]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      setLoading(true);
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
        setFavMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    fetchFavoriteMovies();
  }, []);

  const movieHandler = (movie) => {
    navigate("/movie", { state: { movie } });
  };

  const isFavorite = (id) => {
    return favMovies.some((favMovie) => favMovie.id === id);
  };

  const favHandler = async (id) => {
    setLoading(true);
    setFavMovies((prevFavMovies) => {
      if (isFavorite(id)) {
        return prevFavMovies.filter((favMovie) => favMovie.id !== id);
      } else {
        return [...prevFavMovies, { id }];
      }
    });

    try {
      const response = await axios.post(
        "https://api.themoviedb.org/3/account/20845727/favorite",
        {
          media_type: "movie",
          media_id: id,
          favorite: !isFavorite(id),
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
      setLoading(false);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  return (
    <div className="row">
      <Modal isLoading={loading} />
      {movies && movies.length > 0 && (
        <>
          <h2>{title}</h2>
          <div className={isLargeRow ? "card" : "cardSmall"}>
            {movies.map((item) => (
              <div key={item.id}>
                {item.poster_path &&
                  (item.backdrop_path && (
                    <>
                      <div
                        onClick={() => {
                          movieHandler(item);
                        }}
                        className="imageContainer"
                      >
                        <img
                          className={isLargeRow ? "image" : "smallrow"}
                          src={`${imageUrl}${
                            isLargeRow ? item.poster_path : item.backdrop_path
                          }`}
                          alt={item.title}
                        />
                      </div>
                      <div
                        onClick={() => {
                          favHandler(item.id);
                        }}
                        className={isLargeRow ? "favourite" : "favouritesmall"}
                      >
                        {isFavorite(item.id) ? (
                          <img className="favHeart" src={images.favred} />
                        ) : (
                          <img className="favHeart" src={images.favwhite} />
                        )}
                      </div>
                    </>
                  ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Row;
