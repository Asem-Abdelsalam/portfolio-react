import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFaded, setIsFaded] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const hamburger = document.querySelector('.hamburger');
      const navList = document.querySelector('.nav-list');
      if (isMenuOpen && !hamburger.contains(e.target) && !navList.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsFaded(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <header className={`header ${isFaded ? 'fade' : ''}`}>
        <div className="container">
          <NavLink to="/" className="logo" aria-label="Home">
            Asem Abdelsalam
          </NavLink>
          <nav className="nav-menu" aria-label="Main navigation">
            <ul className={`nav-list ${isMenuOpen ? 'active' : ''}`}>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/projects">Projects</NavLink></li>
              <li><NavLink to="/configurator">Configurator</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li className="search-toggle" aria-label="Toggle search" onClick={toggleSearch}>
                <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </li>
            </ul>
            <button
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </nav>
        </div>
      </header>
      <SearchBar isOpen={isSearchOpen} toggleSearch={toggleSearch} />
    </>
  );
}

export default Header;