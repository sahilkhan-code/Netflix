import React, { useState } from "react";
import "./Menu.css";
import Hamburger from "hamburger-react";
import { useNavigate } from "react-router-dom";

function Menu() {
    const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <div className="menu">
      <div className="burger">
        <Hamburger
          size={22}
          toggled={isMenuOpen}
          toggle={toggleMenu}
          onToggle={(toggled) => {
            if (!toggled) {
              setIsMenuOpen(false);
            }
          }}
          color="red"
        />
      </div>
      {isMenuOpen && (
        <div className="menu-content">
          <span onClick={()=>navigate("/")} className="item">Home</span>
          <span onClick={()=>navigate("/favourite")} className="item">+ MyList</span>
          <span onClick={()=>navigate("/search")} className="item">Search</span>
          <span className="item">Profile</span>
        </div>
      )}
    </div>
  );
}

export default Menu;
