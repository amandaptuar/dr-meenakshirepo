import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ServiceDetail.css';

const serviceData = {
  'weight-loss-program': {
    title: 'Weight Loss Program',
    subtitle: 'Lose Weight. Gain Confidence. Live Better.',
    desc: 'Our Weight Loss Program is designed to help you achieve your ideal weight in a healthy, sustainable and natural way. We focus on balanced nutrition, mindful eating and lifestyle changes that deliver long-term results.',
    features: [
      'Personalized diet plans',
      'Natural & sustainable approach',
      'No crash diets or supplements',
      'Lifestyle & fitness guidance',
      'Regular follow-ups & support',
      'Visible & lasting results'
    ]
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const data = serviceData[id] || serviceData['weight-loss-program']; // Fallback for demo
  const service = serviceData[id] || serviceData['weight-loss-program'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="service-detail-page">
      {/* HERO SECTION */}
      <section className="sd-hero" style={{ backgroundImage: "url('/detailhero.png')" }}>
        <div className="container sd-hero__inner">
          <div className="sd-hero__content">
            <div className="breadcrumb">
              <Link to="/">Home</Link> &gt; <Link to="/services">Services</Link> &gt; <span>{service.title}</span>
            </div>
            
            <span className="section-label">OUR SERVICES</span>
            <h1 className="sd-hero__title">{service.title}</h1>
            <p className="sd-hero__subtitle"><strong>Lose Weight. Gain Confidence. Live Better.</strong></p>
            <p className="sd-hero__desc">
              Our {service.title} is designed to help you achieve your ideal weight in a healthy, sustainable and natural way. We focus on balanced nutrition, mindful eating and lifestyle changes that deliver long-term results.
            </p>
            
            <div className="sd-features-grid">
              {service.features.map((feature, idx) => (
                <div key={idx} className="sd-feature-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d4143a" strokeWidth="2"><circle cx="12" cy="12" r="10" stroke="#d4143a" fill="rgba(212, 20, 58, 0.1)" /><path d="M8 12l3 3 5-5" stroke="#d4143a" /></svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="cta-buttons" style={{ justifyContent: 'flex-start', marginTop: '32px' }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
                Start Assessment 
                <span style={{ background: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#d4143a" strokeWidth="2" style={{width:'12px', height:'12px'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </button>
              <button className="btn-outline-grey" onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>Book an Appointment</button>
            </div>
          </div>
          
          <div className="sd-hero__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="#d4143a" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
            <div>
              <strong>Healthy Today</strong>
              <strong>Stronger Tomorrow</strong>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="sd-process">
        <div className="container">
          <h2 className="section-title text-center">How It Works</h2>
          <div className="sd-process__steps">
            {[
              { id: 1, title: 'Assessment', desc: 'We analyze your health, lifestyle & goals', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 12l2 2 4-4" /></svg>, color: '#d4143a', bg: 'rgba(212, 20, 58, 0.1)' },
              { id: 2, title: 'Personalized Plan', desc: 'Custom diet & lifestyle plan for you', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, color: '#2ecc71', bg: 'rgba(46, 204, 113, 0.1)' },
              { id: 3, title: 'Guidance & Support', desc: 'Regular follow-ups and expert support', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, color: '#f39c12', bg: 'rgba(243, 156, 18, 0.1)' },
              { id: 4, title: 'Track Progress', desc: 'Monitor your progress and stay motivated', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, color: '#9b59b6', bg: 'rgba(155, 89, 182, 0.1)' },
              { id: 5, title: 'Achieve Results', desc: 'Reach your goal and maintain a healthy life', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" /></svg>, color: '#3498db', bg: 'rgba(52, 152, 219, 0.1)' }
            ].map((step, idx) => (
              <React.Fragment key={step.id}>
                <div className="sd-step-card">
                  <div className="sd-step-badge" style={{ background: step.color }}>{step.id}</div>
                  <div className="sd-step-icon" style={{ color: step.color, backgroundColor: step.bg }}>{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {idx < 4 && <div className="sd-step-connector"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL GET */}
      <section className="sd-benefits">
        <div className="container sd-benefits__inner">
          <div className="sd-benefits__content">
            <h2 className="section-title">What You'll Get</h2>
            
            <div className="sd-benefit-item">
              <div className="sd-benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg></div>
              <div>
                <h4>Customized Meal Plan</h4>
                <p>Meals tailored to your taste, lifestyle & goals.</p>
              </div>
            </div>
            
            <div className="sd-benefit-item">
              <div className="sd-benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /></svg></div>
              <div>
                <h4>Fat Loss & Inch Loss</h4>
                <p>Effective fat loss while maintaining energy.</p>
              </div>
            </div>
            
            <div className="sd-benefit-item">
              <div className="sd-benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /></svg></div>
              <div>
                <h4>Better Metabolism</h4>
                <p>Improve metabolism and overall health.</p>
              </div>
            </div>
            
            <div className="sd-benefit-item">
              <div className="sd-benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg></div>
              <div>
                <h4>Ongoing Support</h4>
                <p>Continuous motivation and expert guidance.</p>
              </div>
            </div>
            
            <div className="sd-benefit-item">
              <div className="sd-benefit-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></div>
              <div>
                <h4>Long-term Results</h4>
                <p>Sustainable results, not temporary fixes.</p>
              </div>
            </div>
          </div>

          <div className="sd-benefits__image">
            <div className="transformation-card">
              <div className="tc-images-container">
                <div className="tc-img" style={{ width: '100%' }}>
                  <img src="/image copy 5.png" alt="Before and After Transformation" />
                  <div className="tc-label tc-label--before" style={{ left: '25%' }}>Before</div>
                  <div className="tc-label tc-label--after" style={{ left: '75%' }}>After</div>
                </div>
              </div>
              <div className="tc-caption">
                <strong>Neha S.</strong>
                <span className="text-red">-18 KGS in 3 Months</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="sd-cta-section">
        <div className="container">
          <div className="sd-cta-box">
            <div className="sd-cta-box__left">
              <img src="/veggie_bowl.png" alt="Healthy Plate" />
            </div>
            <div className="sd-cta-box__right">
              <h2>Your Transformation Starts Today!</h2>
              <p>Take the first step towards a healthier, fitter and happier you.</p>
              <div className="cta-buttons" style={{ justifyContent: 'flex-start' }}>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>
                  Start Assessment 
                  <span style={{ background: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#d4143a" strokeWidth="2" style={{width:'12px', height:'12px'}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </button>
                <button className="btn-outline-grey" onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>Book an Appointment</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Red Footer Ribbon */}
      <div className="sh-footer-ribbon" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="container sh-ribbon__inner">
          <div className="fr-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm1-4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
            <div><strong style={{color:'#fff'}}>100% Natural</strong><span style={{color:'rgba(255,255,255,0.8)'}}>Nutrition & Diet Plans</span></div>
          </div>
          <div className="fr-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <div><strong style={{color:'#fff'}}>Expert Guidance</strong><span style={{color:'rgba(255,255,255,0.8)'}}>By Dr. Meenakshi Jain</span></div>
          </div>
          <div className="fr-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <div><strong style={{color:'#fff'}}>Proven Results</strong><span style={{color:'rgba(255,255,255,0.8)'}}>10,000+ Lives Transformed</span></div>
          </div>
          <div className="fr-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div><strong style={{color:'#fff'}}>Pan India Impact</strong><span style={{color:'rgba(255,255,255,0.8)'}}>Helping People Everywhere</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
