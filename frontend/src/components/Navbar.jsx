import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 Doubt Solving Portal
        </Link>
        <Link to="/ask" className="navbar-btn">
          ➕ Ask Question
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
