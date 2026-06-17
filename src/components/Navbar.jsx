import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => scrollTo('hero')}>
          <div className="logo-icon">
            <span className="logo-icon__m">M</span>
            <span className="logo-icon__j">J</span>
          </div>
          <div className="logo-text">
            <span className="logo-text__name">MEENAKSHI JAIN</span>
            <span className="logo-text__title">Nutrition Expert</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          <li><a href="#hero" onClick={e => { e.preventDefault(); scrollTo('hero'); }} className="navbar__link active">Home</a></li>
          <li><a href="#about" onClick={e => { e.preventDefault(); scrollTo('about'); }} className="navbar__link">About</a></li>
          <li
            className="navbar__link navbar__link--dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span>Services <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg></span>
            {servicesOpen && (
              <div className="dropdown">
                {['Weight Loss Program', '21 Days Weight Loss', 'Obesity Management', 'PCOS / PCOD Diet', 'Diabetes Diet Plan', 'Senior Nutrition'].map(s => (
                  <div key={s} className="dropdown__item" onClick={() => scrollTo('services')}>{s}</div>
                ))}
              </div>
            )}
          </li>
          <li><a href="#transformations" onClick={e => { e.preventDefault(); scrollTo('transformations'); }} className="navbar__link">Success Stories</a></li>
          <li><a href="#gallery" onClick={e => { e.preventDefault(); scrollTo('benefits'); }} className="navbar__link">Gallery</a></li>
          <li><a href="#contact" onClick={e => { e.preventDefault(); scrollTo('cta'); }} className="navbar__link">Contact</a></li>
        </ul>

        {/* CTA Button */}
        <button className="btn-primary navbar__cta" onClick={() => scrollTo('cta')}>Book an Appointment</button>

        {/* Hamburger */}
        <button className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {['hero', 'about', 'services', 'transformations', 'benefits', 'cta'].map((id, i) => (
            <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }} className="mobile-link">
              {['Home', 'About', 'Services', 'Success Stories', 'Gallery', 'Contact'][i]}
            </a>
          ))}
          <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => scrollTo('cta')}>Book an Appointment</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
