import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import images from "../../images/images";

function Navbar() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageHandler = () => {
    navigate("/");
  };
  const searchHandler = () => {
    navigate("/search");
  };

  return (
    <div className={`topBar ${show && "nav_black"}`}>
      <img
        onClick={() => {
          imageHandler();
        }}
        className="netflixImg"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="Netflix Logo"
      />
      <div style={{ display: "flex" }}>
        <div onClick={()=>{navigate("/favourite")}} className="favText">Favourites</div>
        <img
          onClick={() => {
            searchHandler();
          }}
          className="search"
          src={images.search}
          alt="User"
        />
        <img
          className="user"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScTWoxwzeFQXDHnBq2AeOA9T10ZrKM5_PQRA&usqp=CAU"
          alt="User"
        />
      </div>
    </div>
  );
}

export default Navbar;
