import React from 'react';
import './Hero.css';

const features = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="7" r="4"/>
        <path d="M5 22c0-4.418 3.582-8 8-8s8 3.582 8 8"/>
        <path d="M19 11c2.2 0 4 1.8 4 4"/>
        <path d="M7 11c-2.2 0-4 1.8-4 4"/>
      </svg>
    ),
    label: 'Personalized\nNutrition Plans',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3C7.477 3 3 7.477 3 13c0 2.8 1.1 5.3 2.9 7.1L5 23h16l-.9-2.9A10 10 0 0 0 23 13c0-5.523-4.477-10-10-10z"/>
        <path d="M10 13h6M13 10v6"/>
      </svg>
    ),
    label: 'Holistic & Natural\nApproach',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="8" r="4"/>
        <path d="M6 23v-2a7 7 0 0 1 14 0v2"/>
        <path d="M17 13l2-2M18.5 15.5l2-.5"/>
      </svg>
    ),
    label: 'Expert Guidance\nEvery Step',
  },
];

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      {/* image.png is the full background via CSS background-image */}
      <div className="hero__inner">

        {/* ── LEFT: Text Content overlaid on the bg image ── */}
        <div className="hero__content">
          <span className="hero__eyebrow">WELCOME TO A HEALTHIER YOU</span>
          <h1 className="hero__headline">
            Fat to Fit.
            <span className="hero__headline--red">Healthy is</span>
            the New You.
          </h1>
          <p className="hero__desc">
            Transform your body, improve your health and boost your confidence with personalized
            nutrition guidance by Dr. Meenakshi Jain, Nutrition Expert.
          </p>

          <div className="hero__features">
            {features.map((f, i) => (
              <div key={i} className="hero__feature">
                <div className="hero__feature-icon">{f.icon}</div>
                <span className="hero__feature-label">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="hero__actions">
            <button className="hero__btn-primary" onClick={() => scrollTo('ai-assessment')}>
              Start Assessment
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="hero__btn-secondary" onClick={() => scrollTo('cta')}>
              Book an Appointment
            </button>
          </div>
        </div>

        {/* ── RIGHT: Info Card overlaid on right side of bg image ── */}
        <div className="hero__info">
          <div className="hero__info-card">
            <div className="hero__info-top">
              <div className="hero__info-avatar">MJ</div>
              <div>
                <div className="hero__info-name">Dr. Meenakshi Jain</div>
                <div className="hero__info-role">Nutrition Expert | Wellness Coach</div>
                <div className="hero__info-exp">22+ Years of Experience</div>
              </div>
            </div>
            <div className="hero__info-divider" />
            <span className="hero__info-quote-icon">❝</span>
            <p className="hero__info-quote">
              My mission is to help people achieve lasting health through balanced nutrition,
              fitness and mindful living.
            </p>
          </div>

          <div className="hero__stat-card">
            <div className="hero__stat-icon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth="2" strokeLinecap="round">
                <circle cx="13" cy="11" r="4.5"/>
                <circle cx="25" cy="11" r="4.5"/>
                <path d="M4 33c0-4.97 4.03-9 9-9"/>
                <path d="M32 33c0-4.97-4.03-9-9-9"/>
                <path d="M13 24c0-2.485 2.015-4.5 4.5-4.5S22 21.515 22 24v9"/>
              </svg>
            </div>
            <div>
              <span className="hero__stat-number">10,000+</span>
              <span className="hero__stat-label">Lives Transformed</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
