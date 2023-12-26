import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Search.css";
import images from "../../images/images";
import axios from "../../axios";
import { API_KEY } from "../../requests";
import Row from "../Row";

function Search() {
  const [value, setValue] = useState("");
  const [data, setData] = useState();

  const searchhandler = (event) => {
    setData(
      `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`
    );
  };

  return (
    <div className="topContainer">
      <Navbar />
      <div className="container">
        <div className="searchContainer">
          <img className="searchimg" src={images.search} />
          <input
            value={value}
            className="searchField"
            type="text"
            placeholder="Search Movies,Tv"
            onChange={(event) => setValue(event.target.value)}
          />
          <button onClick={() => searchhandler()} className="searchButton">
            Search
          </button>
        </div>
      </div>
      <div className="bottomContainer">
        <Row title={"Search Results"} fetchReq={data} isLargeRow={true} />
      </div>
    </div>
  );
}

export default Search;
