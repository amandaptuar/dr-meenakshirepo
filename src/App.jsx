import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import CTASection from './components/CTASection';
import Home from './pages/Home';
import About from './pages/About';
import SuccessStories from './pages/SuccessStories';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Contact from './pages/Contact';
import Assessment from './pages/Assessment';
import Dashboard from './pages/Dashboard';
import BookingModal from './components/BookingModal';
import LoginModal from './components/LoginModal';
import RegistrationSuccess from './pages/RegistrationSuccess';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const location = useLocation();
  const showGlobalCTA = !['/success-stories', '/services', '/contact', '/assessment', '/dashboard', '/registration-success', '/reset-password', '/admin'].includes(location.pathname) && !location.pathname.startsWith('/services/');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenBookingModal = () => setIsBookingModalOpen(true);
    const handleOpenLoginModal = () => setIsLoginModalOpen(true);
    
    window.addEventListener('openBookingModal', handleOpenBookingModal);
    window.addEventListener('openLoginModal', handleOpenLoginModal);
    
    return () => {
      window.removeEventListener('openBookingModal', handleOpenBookingModal);
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
    }
  }, []);

  return (
    <div className="app">
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<AdminDashboard />} />
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
