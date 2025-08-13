import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo-container">
        <img src="/services/logo.png" alt="Way to Work Logo" className="logo-img" />
        <span className="logo-text">Way to Work</span>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/about">About</Link></li>

        </ul>
      </nav>
    </header>
  );
};

export default Header;
