import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartWidget from './CartWidget';

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo/Marca */}
        <Link className="navbar-brand fw-bold" to="/" onClick={closeNavbar}>
          Mi Tienda
        </Link>

        {/* Botón hamburguesa para móvil */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNav" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Menú de navegación */}
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

          {/* Widget del carrito */}
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;