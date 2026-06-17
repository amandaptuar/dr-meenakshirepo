import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const servicesList = [
  {
    id: 'weight-loss-program',
    title: 'Weight Loss Program',
    desc: 'Personalized diet & lifestyle plans to help you lose weight naturally and sustainably.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M12 9v1" /><path d="M12 14v1" /></svg>,
    color: '#e74c3c', bgColor: 'rgba(231, 76, 60, 0.1)'
  },
  {
    id: '21-days-weight-loss',
    title: '21 Days Weight Loss',
    desc: 'Proven 21-day program with simple routines, healthy meals & expert guidance.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>,
    color: '#2ecc71', bgColor: 'rgba(46, 204, 113, 0.1)'
  },
  {
    id: 'obesity-management',
    title: 'Obesity Management',
    desc: 'Targeted nutrition plans to reduce obesity and improve overall health.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /><path d="M4 14v1a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-1" /><path d="M12 2v20" /></svg>,
    color: '#f39c12', bgColor: 'rgba(243, 156, 18, 0.1)'
  },
  {
    id: 'pcos-pcod-diet',
    title: 'PCOS / PCOD Diet',
    desc: 'Hormone-balancing diet plans to manage PCOS symptoms naturally.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9z" /><path d="M12 3a9 9 0 0 0 9 9H3a9 9 0 0 0 9-9z" /><circle cx="12" cy="12" r="3" /></svg>,
    color: '#9b59b6', bgColor: 'rgba(155, 89, 182, 0.1)'
  },
  {
    id: 'diabetes-diet-plan',
    title: 'Diabetes Diet Plan',
    desc: 'Manage blood sugar levels with customized diet and nutrition support.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /><circle cx="12" cy="15" r="2" /></svg>,
    color: '#3498db', bgColor: 'rgba(52, 152, 219, 0.1)'
  },
  {
    id: 'senior-nutrition',
    title: 'Senior Nutrition',
    desc: 'Specialized nutrition plans to support healthy aging & active living.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M16 22v-4a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v4" /><circle cx="18" cy="8" r="3" /><path d="M22 22v-3a3 3 0 0 0-3-3h-1" /><circle cx="6" cy="8" r="3" /><path d="M2 22v-3a3 3 0 0 1 3-3h1" /></svg>,
    color: '#e91e63', bgColor: 'rgba(233, 30, 99, 0.1)'
  },
  {
    id: 'wellness-coaching',
    title: 'Wellness Coaching',
    desc: 'Mindful eating, stress management and lifestyle coaching for long-term wellness.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
    color: '#1abc9c', bgColor: 'rgba(26, 188, 156, 0.1)'
  }
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-hub">
      {/* HERO SECTION */}
      <section className="sh-hero" style={{ backgroundImage: "url('/serviceshero.png')" }}>
        <div className="container sh-hero__inner">
          <div className="sh-hero__content">
            <span className="section-label">OUR SERVICES</span>
            <h1 className="sh-hero__title">
              Personalized Nutrition<br />
              for <span className="highlight">Every Goal</span>
            </h1>
            <p className="sh-hero__desc">
              From weight loss to disease management, we offer science-backed nutrition and wellness programs tailored to your unique needs and lifestyle.
            </p>

            <div className="sh-hero__stats">
              <div className="sh-stat">
                <div className="sh-stat__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <strong>22+</strong>
                <span>Years of Experience</span>
              </div>
              <div className="sh-stat">
                <div className="sh-stat__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <strong>10,000+</strong>
                <span>Lives Transformed</span>
              </div>
              <div className="sh-stat">
                <div className="sh-stat__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                </div>
                <strong>Expert in</strong>
                <span>Nutrition & Wellness</span>
              </div>
              <div className="sh-stat">
                <div className="sh-stat__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <strong>Pan India</strong>
                <span>Impact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="sh-programs">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">WHAT WE OFFER</span>
            <h2 className="section-title">Our Nutrition & Wellness Programs</h2>
          </div>

          <div className="sh-grid">
            {servicesList.map(service => (
              <div className="sh-card" key={service.id}>
                <div className="sh-card__icon" style={{ color: service.color, backgroundColor: service.bgColor }}>{service.icon}</div>
                <h3 className="sh-card__title">{service.title}</h3>
                <p className="sh-card__desc">{service.desc}</p>
                <Link to={`/services/${service.id}`} className="sh-card__link">
                  Learn More <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="sh-cta">
        <div className="container sh-cta__inner">
          <div className="sh-cta__bg">
            <img src="/image copy.png" alt="Dr. Meenakshi Jain" className="sh-cta-doctor" />
            <div className="sh-cta-content">
              <span className="sh-cta-label">READY TO TRANSFORM?</span>
              <h2>Let's Start Your Health Journey Today!</h2>
              <p>Book a consultation with Dr. Meenakshi Jain and take the first step towards a fitter, healthier and happier you.</p>
              <div className="cta-buttons" style={{ justifyContent: 'flex-start' }}>
                <button className="btn-primary" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Start Assessment <span>→</span></button>
                <button className="btn-outline-red" style={{ background: '#fff' }} onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>Book an Appointment</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ribbon Footer */}
        <div className="sh-footer-ribbon">
          <div className="container sh-ribbon__inner">
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <div><strong style={{color:'#fff'}}>Personalized Plans</strong><span style={{color:'rgba(255,255,255,0.8)'}}>Tailored for You</span></div>
            </div>
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
              <div><strong style={{color:'#fff'}}>Natural & Safe</strong><span style={{color:'rgba(255,255,255,0.8)'}}>No Crash Diets</span></div>
            </div>
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <div><strong style={{color:'#fff'}}>Expert Guidance</strong><span style={{color:'rgba(255,255,255,0.8)'}}>By Dr. Meenakshi Jain</span></div>
            </div>
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <div><strong style={{color:'#fff'}}>Proven Results</strong><span style={{color:'rgba(255,255,255,0.8)'}}>Real Transformations</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
