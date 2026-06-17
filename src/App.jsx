import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CTASection from './components/CTASection';
import Home from './pages/Home';
import About from './pages/About';
import SuccessStories from './pages/SuccessStories';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import './App.css';

function App() {
  const location = useLocation();
  const showGlobalCTA = !['/success-stories', '/services'].includes(location.pathname) && !location.pathname.startsWith('/services/');

  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
        </Routes>
        {showGlobalCTA && <CTASection />}
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <p>&copy; {new Date().getFullYear()} Dr. Meenakshi Jain — Nutrition Expert &amp; Wellness Coach. All rights reserved.</p>
          <p className="footer__tagline">Transforming Lives Through Balanced Nutrition 🌿</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
