import React from 'react';
import './CTASection.css';

const CTASection = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="cta" className="cta-section">
      <div className="container cta-section__inner">

        {/* ── LEFT: Text & Buttons ── */}
        <div className="cta-section__content">
          <h2 className="cta-section__title">Your Transformation Starts Today</h2>
          <p className="cta-section__subtitle">
            Take the first step towards a healthier, happier you.<br />
            We are here to guide you every step of the way.
          </p>

          <div className="cta-section__actions">
            <button className="cta-btn cta-btn--primary" onClick={() => scrollTo('ai-assessment')}>
              Start Assessment
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="cta-btn cta-btn--outline" onClick={() => scrollTo('cta')}>
              Book an Appointment
            </button>
          </div>

          <div className="cta-section__call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>or Call Us: <strong>+91-844-811-2506</strong></span>
          </div>
        </div>

        {/* ── RIGHT: Doctor photo from image copy.png ── */}
        <div className="cta-section__doctor-wrap">
          <img
            src="/image copy.png"
            alt="Dr. Meenakshi Jain"
            className="cta-section__doctor-img"
          />
        </div>

      </div>
    </section>
  );
};

export default CTASection;
