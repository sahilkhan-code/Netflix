import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import "./Favourite.css";
import images from "../images/images";
import Watchlist from "./Watchlist";
import Modal from "./Modal";
import requests, { token } from "../requests";

function Favourites() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      setLoading(true);
      const options = {
        method: "GET",
        url: requests.getFavMovies,
        params: { language: "en-US", page: "1", sort_by: "created_at.asc" },
        headers: {
          accept: "application/json",
          Authorization: token,
        },
      };

      try {
        const response = await axios.request(options);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching favorite movies:", error);
        // throw error;
      }
    };

    fetchFavoriteMovies();
  }, []);

  const movieHandler = (movie) => {
    navigate("/movie", { state: { movie } });
  };

  const favHandler = async (id) => {
    try {
      await axios.post(
        requests.addFavMovies,
        {
          media_type: "movie",
          media_id: id,
          favorite: false,
        },
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: token,
          },
        }
      );

      setMovies((prevMovies) => prevMovies.filter((item) => item.id !== id));
      console.log(movies);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <div className="topContainer" style={{ height: "100%" }}>
      <Navbar />
      <Modal isLoading={loading} />
      <div className="row" style={{ paddingTop: 100 }}>
        <h2>Favourites</h2>
        {movies && movies.length > 0 ? (
          <>
            <div className={"cards"}>
              {movies.map((item) => (
                <div key={item.id} style={{ marginBottom: 20 }}>
                  <div
                    onClick={() => {
                      movieHandler(item);
                    }}
                    className="imageContainer"
                  >
                    <img
                      className={item.poster_path ? "image" : "noimg"}
                      src={item.poster_path ? `${imageUrl}${item.poster_path}` : images.noimg}
                      // alt={item.title}
                    />
                  </div>
                  <div
                    onClick={() => {
                      favHandler(item.id);
                    }}
                    className={"favourite"}
                  >
                    <img className="favHeart" src={images.favred} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="addNew">Nothing in Favourites</div>
        )}
      </div>
      <Watchlist />
    </div>
  );
}

export default Favourites;
