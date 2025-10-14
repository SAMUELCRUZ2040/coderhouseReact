import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>
          Mi Tienda
        </Link>

        <button 
          className="navbar-toggler mx-auto" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNav" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <div className="navbar-nav mx-auto">
            <Link 
              className={`nav-link ${isActive('/')}`} 
              to="/"
              onClick={closeNavbar}
            >
              Home
            </Link>
            <Link 
              className={`nav-link ${isActive('/about')}`} 
              to="/about"
              onClick={closeNavbar}
            >
              About
            </Link>
            <Link 
              className={`nav-link ${isActive('/services')}`} 
              to="/services"
              onClick={closeNavbar}
            >
              Services
            </Link>
            <Link 
              className={`nav-link ${isActive('/contact')}`} 
              to="/contact"
              onClick={closeNavbar}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;