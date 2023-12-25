import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`topBar ${show && 'nav_black'}`}>
      <img
        className="netflixImg"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="Netflix Logo"
      />
      <img
        className="user"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScTWoxwzeFQXDHnBq2AeOA9T10ZrKM5_PQRA&usqp=CAU"
        alt="User"
      />
    </div>
  );
}

export default Navbar;
