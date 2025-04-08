import React, { useEffect, useRef } from 'react';

function SearchBar({ isOpen, toggleSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) inputRef.current.focus();
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) toggleSearch();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, toggleSearch]);

  return (
    <div id="search-bar" className={`search-bar ${isOpen ? 'active' : ''}`} role="search">
      <div className="container">
        <input
          type="search"
          placeholder="Search projects..."
          id="search-input"
          aria-label="Search projects"
          ref={inputRef}
        />
        <button className="close-search" aria-label="Close search" onClick={toggleSearch}>
          <svg className="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;