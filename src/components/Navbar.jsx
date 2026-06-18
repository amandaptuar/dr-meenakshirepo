import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [session, setSession]         = useState(null);
  const [profile, setProfile]         = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate   = useNavigate();
  const location   = useLocation();

  const isDashboard = location.pathname === '/dashboard';

  /* ── Scroll ────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Auth ──────────────────────────────── */
  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) loadProfile(session.user.id);
    };
    load();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      if (s) loadProfile(s.user.id);
      else setProfile(null);
    });

    const onAuthChanged = () => load();
    window.addEventListener('authStatusChanged', onAuthChanged);
    return () => {
      window.removeEventListener('authStatusChanged', onAuthChanged);
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async (uid) => {
    const { data } = await supabase.from('users').select('name, email').eq('id', uid).single();
    if (data) setProfile(data);
  };

  /* ── Close dropdown on outside click ───── */
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Hash scroll ────────────────────────── */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location]);

  const handleNavClick = (e, path, hash = '') => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === path) {
      if (hash) document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const initials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  /* ─────────────────────────────────────────
     Profile Avatar + Dropdown (reusable)
  ───────────────────────────────────────── */
  const ProfileAvatar = () => (
    <div ref={profileRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setProfileOpen(prev => !prev)}
        title={profile?.name || 'Profile'}
        style={{
          width: '42px', height: '42px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), #ff6b6b)',
          color: '#fff', fontWeight: 800, fontSize: '15px',
          border: '2px solid rgba(255,255,255,0.3)',
          cursor: 'pointer', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(212,20,58,0.35)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          fontFamily: "'Inter', sans-serif",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {initials(profile?.name)}
      </button>

      {/* Dropdown */}
      {profileOpen && (
        <div style={{
          position: 'absolute', top: '54px', right: 0,
          background: '#fff', borderRadius: '14px',
          boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
          border: '1px solid #f0f0f0',
          minWidth: '240px', zIndex: 99999,
          overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
        }}>
          {/* Profile info */}
          <div style={{ padding: '20px', borderBottom: '1px solid #f4f4f4', background: '#fafafa' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), #ff6b6b)',
              color: '#fff', fontWeight: 800, fontSize: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '10px',
            }}>
              {initials(profile?.name)}
            </div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px', marginBottom: '3px' }}>
              {profile?.name || 'User'}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '13px', wordBreak: 'break-all' }}>
              {profile?.email || session?.user?.email}
            </div>
          </div>

          {/* Menu items */}
          <div style={{ padding: '6px' }}>
            <DropdownItem
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
              label="My Dashboard"
              onClick={() => { setProfileOpen(false); navigate('/dashboard'); }}
              color="#333"
              hoverBg="#f5f5f5"
            />
            <DropdownItem
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>}
              label="Logout"
              onClick={handleLogout}
              color="#b91c1c"
              hoverBg="#fef2f2"
            />
          </div>
        </div>
      )}
    </div>
  );

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

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          <li><Link to="/" onClick={(e) => handleNavClick(e, '/', '')} className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
          <li><Link to="/about" onClick={(e) => handleNavClick(e, '/about', '')} className={`navbar__link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link></li>
          <li><Link to="/services" onClick={(e) => handleNavClick(e, '/services', '')} className={`navbar__link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link></li>
          <li><Link to="/success-stories" onClick={(e) => handleNavClick(e, '/success-stories', '')} className={`navbar__link ${location.pathname === '/success-stories' ? 'active' : ''}`}>Success Stories</Link></li>
          <li><Link to="/contact" onClick={(e) => handleNavClick(e, '/contact', '')} className={`navbar__link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
        </ul>

        {/* Right Actions */}
        <div className="navbar__actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {session ? (
            <>
              {/* Dashboard link — hidden when already on dashboard */}
              {!isDashboard && (
                <Link to="/dashboard" className="navbar__link" style={{ fontWeight: 600, color: 'var(--primary)' }}>
                  Dashboard
                </Link>
              )}
              {/* Profile avatar with dropdown */}
              <ProfileAvatar />
            </>
          ) : (
            <button
              className="btn-secondary navbar__cta"
              style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => window.dispatchEvent(new Event('openLoginModal'))}
            >
              Sign In
            </button>
          )}

          {/* Book Appointment — always rightmost */}
          <button className="btn-primary navbar__cta" onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>
            Book an Appointment
          </button>
        </div>

        {/* Hamburger */}
        <button className={`navbar__hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(p => !p)} aria-label="Menu">
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

          {session ? (
            <>
              {/* Profile card in mobile menu */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px', background: '#f9f9f9', borderRadius: '14px',
                marginTop: '10px', border: '1px solid #f0f0f0',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--primary), #ff6b6b)',
                  color: '#fff', fontWeight: 800, fontSize: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {initials(profile?.name)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '15px' }}>{profile?.name || 'User'}</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '2px', wordBreak: 'break-all' }}>
                    {profile?.email || session?.user?.email}
                  </div>
                </div>
              </div>

              {!isDashboard && (
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="mobile-link"
                  style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}
                >
                  📊 My Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                style={{
                  width: '100%', padding: '13px 20px', marginTop: '8px',
                  background: '#fef2f2', color: '#b91c1c',
                  border: '1px solid #fecaca', borderRadius: '50px',
                  fontWeight: 600, fontSize: '16px', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => { window.dispatchEvent(new Event('openLoginModal')); setMenuOpen(false); }}
              style={{
                width: '100%', padding: '13px 20px', marginTop: '10px',
                background: '#f1f5f9', color: '#0f172a',
                border: '1px solid #e2e8f0', borderRadius: '50px',
                fontWeight: 600, fontSize: '16px', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Sign In
            </button>
          )}

          <button
            className="btn-primary"
            style={{ marginTop: '10px', width: '100%', fontSize: '16px' }}
            onClick={() => { window.dispatchEvent(new Event('openBookingModal')); setMenuOpen(false); }}
          >
            Book an Appointment
          </button>
        </div>
      )}
    </nav>
  );
};

/* ── Small helper for dropdown menu items ── */
const DropdownItem = ({ icon, label, onClick, color, hoverBg }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%', padding: '11px 16px', textAlign: 'left',
        background: hovered ? hoverBg : 'none',
        border: 'none', cursor: 'pointer', borderRadius: '8px',
        fontSize: '15px', color, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: '10px',
        fontFamily: "'Inter', sans-serif",
        transition: 'background 0.15s',
      }}
    >
      {icon}{label}
    </button>
  );
};

export default Navbar;
