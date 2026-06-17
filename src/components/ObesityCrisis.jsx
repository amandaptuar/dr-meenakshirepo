import React from 'react';
import obesityImg from '../assets/obesity.png';
import './ObesityCrisis.css';

/* SVG Icons matching the reference design */
const PersonIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="12" r="7" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const CityIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="18" width="14" height="24" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <rect x="20" y="8" width="22" height="34" rx="1" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <line x1="26" y1="8" x2="26" y2="42" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
    <line x1="32" y1="8" x2="32" y2="42" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"/>
    <rect x="10" y="24" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
    <rect x="10" y="32" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
    <rect x="24" y="16" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
    <rect x="32" y="16" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
    <rect x="24" y="24" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
    <rect x="32" y="24" width="4" height="4" rx="0.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none"/>
    <line x1="3" y1="42" x2="45" y2="42" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
  </svg>
);

const ChildrenIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="11" r="5" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <circle cx="32" cy="11" r="5" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <path d="M6 38c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M22 38c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 28a8 8 0 0 0 11.31 0l5.66-5.66a8 8 0 0 0-11.31-11.31l-2.83 2.83" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M28 20a8 8 0 0 0-11.31 0L11.03 25.66a8 8 0 0 0 11.31 11.31l2.83-2.83" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const stats = [
  { Icon: PersonIcon, number: '135M+', label: 'Indians are overweight' },
  { Icon: CityIcon,  number: '50%',   label: 'Urban population at risk' },
  { Icon: ChildrenIcon, number: '1 in 4', label: 'Children obese by 2030' },
  { Icon: LinkIcon,  number: '82%',   label: 'Lifestyle diseases linked' },
];

const ObesityCrisis = () => (
  <section id="obesity-crisis" className="obesity-crisis">
    <div className="container obesity-crisis__inner">

      {/* LEFT: Text + Stats */}
      <div className="obesity-crisis__content">
        <h2 className="obesity-crisis__title">India's Obesity Crisis</h2>
        <p className="obesity-crisis__subtitle">The numbers are rising. It's time to take control.</p>

        <div className="obesity-crisis__stats">
          {stats.map(({ Icon, number, label }, i) => (
            <div key={i} className="crisis-stat">
              <div className="crisis-stat__icon-wrap">
                <Icon />
              </div>
              <div className="crisis-stat__number">{number}</div>
              <div className="crisis-stat__label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Real photo in a circular frame */}
      <div className="obesity-crisis__image-wrap">
        <div className="obesity-crisis__img-circle">
          <img src={obesityImg} alt="India obesity crisis - unhealthy eating" className="obesity-crisis__img" />
        </div>
        <div className="obesity-crisis__img-glow" />
      </div>

    </div>
  </section>
);

export default ObesityCrisis;
