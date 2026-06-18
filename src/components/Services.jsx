import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

/* Matching reference: clean red outlined SVG icons */
const WeightLossIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14 14-6.268 14-14S25.732 4 18 4z"/>
    <path d="M18 12v6l4 2"/>
    <path d="M12 18h2M22 18h2"/>
  </svg>
);

const DaysIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="7" width="28" height="24" rx="3"/>
    <path d="M25 4v6M11 4v6M4 14h28"/>
    <path d="M11 20h4M21 20h4M11 26h4"/>
  </svg>
);

const ObesityIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="10" r="5"/>
    <path d="M10 32c0-4.418 3.582-8 8-8s8 3.582 8 8"/>
    <path d="M25 20c3 0 6 2.686 6 6"/>
    <path d="M11 20c-3 0-6 2.686-6 6"/>
  </svg>
);

const PCOSIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="20" r="8"/>
    <circle cx="24" cy="20" r="8"/>
    <path d="M12 12V8M18 6v-2M24 12V8"/>
    <path d="M16 20h4"/>
  </svg>
);

const DiabetesIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 4l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z"/>
    <path d="M8 24c0 4 4 8 10 8s10-4 10-8"/>
  </svg>
);

const SeniorIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="9" r="5"/>
    <path d="M10 32V22c0-4.418 3.582-8 8-8s8 3.582 8 8v10"/>
    <path d="M14 32v-6M22 32v-6"/>
    <path d="M10 28h16"/>
  </svg>
);

const services = [
  {
    Icon: WeightLossIcon,
    title: 'Weight Loss Program',
    desc: 'Personalized diet & lifestyle plans to help you lose weight naturally and sustainably.',
  },
  {
    Icon: DaysIcon,
    title: '21 Days Weight Loss',
    desc: 'Proven 21-day program with simple routines, healthy meals & expert guidance.',
  },
  {
    Icon: ObesityIcon,
    title: 'Obesity Management',
    desc: 'Targeted nutrition plans to reduce obesity and improve overall health.',
  },
  {
    Icon: PCOSIcon,
    title: 'PCOS / PCOD Diet',
    desc: 'Hormone-balancing diet plans to manage PCOS symptoms naturally.',
  },
  {
    Icon: DiabetesIcon,
    title: 'Diabetes Diet Plan',
    desc: 'Manage blood sugar levels with customized diet and nutrition support.',
  },
  {
    Icon: SeniorIcon,
    title: 'Senior Nutrition',
    desc: 'Specialized nutrition plans to support healthy aging & active living.',
  },
];

const Services = () => (
  <section id="services" className="services">
    <div className="container">
      <div className="section-header">
        <span className="section-label">OUR SERVICES</span>
        <h2 className="section-title">Nutrition Programs for Every Goal</h2>
      </div>

      <div className="services__grid">
        {services.map(({ Icon, title, desc }, i) => (
          <div key={i} className="service-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="service-card__icon-wrap">
              <Icon />
            </div>
            <h3 className="service-card__title">{title}</h3>
            <p className="service-card__desc">{desc}</p>
            <Link to="/services" className="service-card__link" style={{ display: 'inline-flex', alignItems: 'center' }}>
              Learn More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
