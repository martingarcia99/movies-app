import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/main.scss';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src="/favicon.ico" height="30px"/>
        <p>Movie App</p>
      </div>
      <div className="navbar__links">
        <Link to="/" className="navbar__link">Home</Link>
        <Link to="/wishlist" className="navbar__link">Wishlist</Link>
      </div>
    </nav>
  );
};

export default Navbar;
