import React from 'react';
import './Hero.css';

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="9" r="5"/>
        <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10"/>
        <path d="M23 14c2.5 0 5 2 5 5"/>
        <path d="M9 14c-2.5 0-5 2-5 5"/>
      </svg>
    ),
    label: 'Personalized\nNutrition Plans',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3C9.373 3 4 8.373 4 15c0 3.3 1.34 6.3 3.51 8.49L6 27h20l-1.51-3.51A11.96 11.96 0 0 0 28 15C28 8.373 22.627 3 16 3z"/>
        <path d="M11 15h10M16 10v10"/>
      </svg>
    ),
    label: 'Holistic & Natural\nApproach',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="9" r="5"/>
        <path d="M7 28v-3a9 9 0 0 1 18 0v3"/>
        <path d="M21 16l3-3M23 19l3-1"/>
      </svg>
    ),
    label: 'Expert Guidance\nEvery Step',
  },
];

const Hero = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero">
      {/* /image.png is the full CSS background — doctor shows in the centre */}
      <div className="hero__inner">

        {/* ── LEFT: Text Content ── */}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="hero__btn-secondary" onClick={() => scrollTo('cta')}>
              Book an Appointment
            </button>
          </div>
        </div>

        {/* ── CENTRE: empty — doctor image is in CSS background ── */}
        <div className="hero__spacer" />

        {/* ── RIGHT: Info Cards ── */}
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
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth="2" strokeLinecap="round">
                <circle cx="16" cy="13" r="5.5"/>
                <circle cx="30" cy="13" r="5.5"/>
                <path d="M4 40c0-6.627 5.373-12 12-12"/>
                <path d="M40 40c0-6.627-5.373-12-12-12"/>
                <path d="M16 28c0-3.314 2.686-6 6-6s6 2.686 6 6v12"/>
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
