import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer-nav">
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/configurator">Configurator</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/asem-abdelsalam/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19v4.74h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </a>
          <a href="mailto:assemmohamed1000@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 4H2a2 2 0 00-2 2v12a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zm-2.35 2.65l-7.65 7.65a1 1 0 01-1.4 0L2.35 6.65A1 1 0 013 6h18a1 1 0 01.65.65zM22 18H2V8l8 8 8-8v10z"></path>
            </svg>
          </a>
          <a href="https://github.com/Asem-Abdelsalam" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03 1.36 2.33 3.56 1.66 4.43 1.27.14-.98.54-1.66 1-2.04-3.46-.39-7.1-1.73-7.1-7.7 0-1.7.61-3.09 1.61-4.18-.16-.39-.7-1.96.15-4.08 0 0 1.31-.42 4.3 1.6a15 15 0 017.9 0c3-2.02 4.3-1.6 4.3-1.6.85 2.12.31 3.69.15 4.08 1 1.09 1.61 2.48 1.61 4.18 0 6-3.65 7.3-7.11 7.7.56.48 1.06 1.43 1.06 2.88v2.14c0 .27.16.58.67.5A10 10 0 0022 12 10 10 0 0012 2z"></path>
            </svg>
          </a>
        </div>
        <a href="#" className="back-to-top" onClick={scrollToTop}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          Back to Top
        </a>
        <p>© 2025 Asem Abdelsalam</p>
      </div>
    </footer>
  );
}

export default Footer;