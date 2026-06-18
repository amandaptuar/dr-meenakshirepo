import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle cross-page scrolling
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleNavClick = (e, path, hash = '') => {
    e.preventDefault();
    setMenuOpen(false);
    
    if (location.pathname === path) {
      if (hash) {
        document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(`${path}${hash}`);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <div className="logo-icon">
            <span className="logo-icon__m">M</span>
            <span className="logo-icon__j">J</span>
          </div>
          <div className="logo-text">
            <span className="logo-text__name">MEENAKSHI JAIN</span>
            <span className="logo-text__title">Nutrition Expert</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          <li>
            <Link to="/" onClick={(e) => handleNavClick(e, '/', '')} className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={(e) => handleNavClick(e, '/about', '')} className={`navbar__link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          </li>
          <li><Link to="/services" onClick={(e) => handleNavClick(e, '/services', '')} className={`navbar__link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link></li>
          <li><Link to="/success-stories" onClick={(e) => handleNavClick(e, '/success-stories', '')} className={`navbar__link ${location.pathname === '/success-stories' ? 'active' : ''}`}>Success Stories</Link></li>
          <li><Link to="/contact" onClick={(e) => handleNavClick(e, '/contact', '')} className={`navbar__link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
        </ul>

        {/* CTA Button */}
        <button className="btn-primary navbar__cta" onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>Book an Appointment</button>

        {/* Hamburger */}
        <button className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <Link to="/" onClick={(e) => handleNavClick(e, '/', '')} className="mobile-link">Home</Link>
          <Link to="/about" onClick={(e) => handleNavClick(e, '/about', '')} className="mobile-link">About</Link>
          <Link to="/services" onClick={(e) => handleNavClick(e, '/services', '')} className="mobile-link">Services</Link>
          <Link to="/success-stories" onClick={(e) => handleNavClick(e, '/success-stories', '')} className="mobile-link">Success Stories</Link>
          <Link to="/contact" onClick={(e) => handleNavClick(e, '/contact', '')} className="mobile-link">Contact</Link>
          <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => { window.dispatchEvent(new Event('openBookingModal')); setMenuOpen(false); }}>Book an Appointment</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
