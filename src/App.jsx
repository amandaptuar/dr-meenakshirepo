import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Transformations from './components/Transformations';
import Services from './components/Services';
import Benefits from './components/Benefits';
import ObesityCrisis from './components/ObesityCrisis';
import AIAssessment from './components/AIAssessment';
import CTASection from './components/CTASection';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Transformations />
        <Services />
        <Benefits />
        <ObesityCrisis />
        <AIAssessment />
        <CTASection />
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
