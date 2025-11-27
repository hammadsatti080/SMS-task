import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'relative'
  };

  const navContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const logoStyle = {
    color: 'white',
    fontSize: isMobile ? '1.2rem' : '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    zIndex: 1001
  };

  const navLinksStyle = {
    display: isMobile && !isMenuOpen ? 'none' : 'flex',
    gap: isMobile ? '1.5rem' : '2rem',
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '100%' : 'auto',
    left: isMobile ? 0 : 'auto',
    right: isMobile ? 0 : 'auto',
    backgroundColor: isMobile ? '#2c3e50' : 'transparent',
    padding: isMobile ? '2rem' : '0',
    boxShadow: isMobile ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
    zIndex: 1000
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: isMobile ? '1.1rem' : '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    padding: isMobile ? '0.75rem 1rem' : '0.5rem 1rem',
    borderRadius: '4px',
    display: 'block',
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' : 'left'
  };

  const navLinkHoverStyle = {
    backgroundColor: 'rgba(255,255,255,0.1)'
  };

  const hamburgerStyle = {
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '30px',
    height: '25px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    zIndex: 1001
  };

  const hamburgerLineStyle = {
    width: '100%',
    height: '3px',
    backgroundColor: 'white',
    borderRadius: '10px',
    transition: 'all 0.3s ease',
    transformOrigin: 'left'
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav style={navStyle}>
      <div style={navContentStyle}>
        <Link to="/" style={logoStyle}>
          Student Management
        </Link>
        
        {/* Hamburger Menu Button - Only show on mobile */}
        {isMobile && (
          <button 
            style={hamburgerStyle}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span style={{
              ...hamburgerLineStyle,
              transform: isMenuOpen ? 'rotate(45deg) translate(5px, -3px)' : 'none'
            }}></span>
            <span style={{
              ...hamburgerLineStyle,
              opacity: isMenuOpen ? 0 : 1
            }}></span>
            <span style={{
              ...hamburgerLineStyle,
              transform: isMenuOpen ? 'rotate(-45deg) translate(5px, 3px)' : 'none'
            }}></span>
          </button>
        )}

        {/* Navigation Links */}
        <div style={navLinksStyle}>
          <Link 
            to="/students" 
            style={navLinkStyle}
            onMouseOver={(e) => !isMobile && Object.assign(e.target.style, navLinkHoverStyle)}
            onMouseOut={(e) => !isMobile && Object.assign(e.target.style, { backgroundColor: 'transparent' })}
            onClick={handleLinkClick}
          >
            Students
          </Link>
          <Link 
            to="/add-student" 
            style={navLinkStyle}
            onMouseOver={(e) => !isMobile && Object.assign(e.target.style, navLinkHoverStyle)}
            onMouseOut={(e) => !isMobile && Object.assign(e.target.style, { backgroundColor: 'transparent' })}
            onClick={handleLinkClick}
          >
            Add Student
          </Link>
       
        </div>
      </div>
    </nav>
  );
};

export default Navbar;