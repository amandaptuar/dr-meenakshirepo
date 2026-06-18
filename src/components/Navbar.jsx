import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardPage = location.pathname === '/dashboard';

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth listener
  useEffect(() => {
    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) fetchProfile(session.user.id);
    };
    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    const handleAuthChange = () => loadSession();
    window.addEventListener('authStatusChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStatusChanged', handleAuthChange);
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase.from('users').select('name, email').eq('id', userId).single();
    if (data) setProfile(data);
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setProfileOpen(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event('authStatusChanged'));
    navigate('/');
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
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

        {/* Desktop Nav Links — always visible on all pages */}
        <ul className="navbar__links">
          <li><Link to="/" onClick={(e) => handleNavClick(e, '/', '')} className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
          <li><Link to="/about" onClick={(e) => handleNavClick(e, '/about', '')} className={`navbar__link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link></li>
          <li><Link to="/services" onClick={(e) => handleNavClick(e, '/services', '')} className={`navbar__link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link></li>
          <li><Link to="/success-stories" onClick={(e) => handleNavClick(e, '/success-stories', '')} className={`navbar__link ${location.pathname === '/success-stories' ? 'active' : ''}`}>Success Stories</Link></li>
          <li><Link to="/contact" onClick={(e) => handleNavClick(e, '/contact', '')} className={`navbar__link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
        </ul>

        {/* Actions — always on the right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="navbar__actions">
          {session ? (
            <>
              {/* Show Dashboard link only when NOT on dashboard page */}
              {!isDashboardPage && (
                <Link to="/dashboard" className="navbar__link" style={{ fontWeight: 600, color: 'var(--primary)' }}>Dashboard</Link>
              )}

              {/* Profile Avatar + Dropdown */}
              <div ref={profileRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), #ff6b6b)',
                    color: '#fff', fontWeight: 700, fontSize: '14px',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(212,20,58,0.3)',
                    transition: 'transform 0.2s',
                  }}
                  title={profile?.name || 'Profile'}
                >
                  {getInitials(profile?.name)}
                </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div style={{
                      position: 'absolute', top: '52px', right: 0,
                      background: '#fff', borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      border: '1px solid #f0f0f0',
                      minWidth: '240px', zIndex: 9999,
                      overflow: 'hidden'
                    }}>
                      {/* Profile info */}
                      <div style={{ padding: '20px', borderBottom: '1px solid #f0f0f0' }}>
                        <div style={{
                          width: '48px', height: '48px', borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--primary), #ff6b6b)',
                          color: '#fff', fontWeight: 700, fontSize: '18px',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginBottom: '12px'
                        }}>
                          {getInitials(profile?.name)}
                        </div>
                        <div style={{ fontWeight: 700, color: '#111', fontSize: '15px', marginBottom: '4px' }}>
                          {profile?.name || 'User'}
                        </div>
                        <div style={{ color: '#888', fontSize: '13px', wordBreak: 'break-all' }}>
                          {profile?.email || session?.user?.email}
                        </div>
                      </div>

                      {/* Actions */}
                      <div style={{ padding: '8px' }}>
                        <button
                          onClick={() => { setProfileOpen(false); navigate('/dashboard'); }}
                          style={{
                            width: '100%', padding: '10px 16px', textAlign: 'left',
                            background: 'none', border: 'none', cursor: 'pointer',
                            borderRadius: '8px', fontSize: '14px', color: '#333',
                            fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                          My Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          style={{
                            width: '100%', padding: '10px 16px', textAlign: 'left',
                            background: 'none', border: 'none', cursor: 'pointer',
                            borderRadius: '8px', fontSize: '14px', color: '#b91c1c',
                            fontWeight: 500, display: 'flex', alignItems: 'center', gap: '10px'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                className="btn-secondary navbar__cta"
                style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '50px', fontWeight: '600', cursor: 'pointer' }}
                onClick={() => window.dispatchEvent(new Event('openLoginModal'))}
              >
                Sign In
              </button>
            )}

          {/* Book Appointment — always on right */}
          <button className="btn-primary navbar__cta" onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
            Book an Appointment
          </button>
        </div>

        {/* Hamburger */}
        <button className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          {/* All links always visible in mobile menu */}
          <Link to="/" onClick={(e) => handleNavClick(e, '/', '')} className="mobile-link">Home</Link>
          <Link to="/about" onClick={(e) => handleNavClick(e, '/about', '')} className="mobile-link">About</Link>
          <Link to="/services" onClick={(e) => handleNavClick(e, '/services', '')} className="mobile-link">Services</Link>
          <Link to="/success-stories" onClick={(e) => handleNavClick(e, '/success-stories', '')} className="mobile-link">Success Stories</Link>
          <Link to="/contact" onClick={(e) => handleNavClick(e, '/contact', '')} className="mobile-link">Contact</Link>

          {session ? (
            <>
              <div style={{ padding: '16px', background: '#f9f9f9', borderRadius: '12px', marginTop: '8px' }}>
                <div style={{ fontWeight: 700, color: '#111', fontSize: '16px' }}>{profile?.name || 'User'}</div>
                <div style={{ color: '#888', fontSize: '14px', marginTop: '2px' }}>{profile?.email || session?.user?.email}</div>
              </div>
              {!isDashboardPage && (
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="mobile-link" style={{ color: 'var(--primary)', marginTop: '8px' }}>Dashboard</Link>
              )}
              <button
                style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', padding: '12px 24px', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', marginTop: 12, width: '100%', fontSize: '16px' }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', padding: '12px 24px', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', marginTop: 12, width: '100%', fontSize: '16px' }}
              onClick={() => { window.dispatchEvent(new Event('openLoginModal')); setMenuOpen(false); }}
            >
              Sign In
            </button>
          )}

          {/* Book Appointment always at bottom */}
          <button className="btn-primary" style={{ marginTop: 12, width: '100%', fontSize: '16px' }} onClick={() => { window.dispatchEvent(new Event('openBookingModal')); setMenuOpen(false); }}>
            Book an Appointment
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
