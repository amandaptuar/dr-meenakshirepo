import React from 'react';
import './Benefits.css';

const HealthyWeightIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 22c0-6.075 4.925-11 11-11s11 4.925 11 11"/>
    <path d="M5 22h28"/>
    <path d="M19 11V7"/>
    <circle cx="19" cy="5" r="2"/>
    <path d="M13 22v4M25 22v4M19 22v8"/>
  </svg>
);

const ImmunityIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 4l12 5v10c0 7-12 15-12 15S7 26 7 19V9L19 4z"/>
    <path d="M14 19l3 3 7-7"/>
  </svg>
);

const EnergyIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4L14 20h10L16 34"/>
    <path d="M8 12h4M26 12h4M8 26h4M26 26h4"/>
  </svg>
);

const DigestionIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8c0 0-4 6-4 12s4 8 4 8 4 6 7 6 7-6 7-6 4-2 4-8-4-12-4-12"/>
    <path d="M19 14v6M16 17h6"/>
  </svg>
);

const SkinIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="19" cy="18" rx="11" ry="13"/>
    <path d="M19 5v3M19 28v3M8 18H5M34 18h-3"/>
    <circle cx="19" cy="18" r="4"/>
  </svg>
);

const MentalIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 7c-6.627 0-12 5.373-12 12 0 4.418 2.392 8.282 5.939 10.395"/>
    <path d="M19 7c6.627 0 12 5.373 12 12 0 4.418-2.392 8.282-5.939 10.395"/>
    <path d="M14 29.5V32a5 5 0 0 0 10 0v-2.5"/>
    <path d="M16 19c0-1.657 1.343-3 3-3s3 1.343 3 3"/>
    <path d="M19 16v-4"/>
  </svg>
);

const benefits = [
  { Icon: HealthyWeightIcon, label: 'Healthy\nWeight' },
  { Icon: ImmunityIcon,      label: 'Boosts\nImmunity' },
  { Icon: EnergyIcon,        label: 'Improves Energy\n& Stamina' },
  { Icon: DigestionIcon,     label: 'Better Digestion\n& Metabolism' },
  { Icon: SkinIcon,          label: 'Clear Skin &\nStrong Hair' },
  { Icon: MentalIcon,        label: 'Mental Wellness &\nStress Relief' },
];

const Benefits = () => (
  <section id="benefits" className="benefits">
    <div className="container">
      <div className="section-header">
        <span className="section-label">BENEFITS OF NUTRITION</span>
        <h2 className="section-title">Good Nutrition, Better Life</h2>
      </div>

      <div className="benefits__grid">
        {benefits.map(({ Icon, label }, i) => (
          <div key={i} className="benefit-item" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="benefit-item__icon-ring">
              <Icon />
            </div>
            <span className="benefit-item__label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
