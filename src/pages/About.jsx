import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__content">
            <span className="section-label">ABOUT DR. MEENAKSHI JAIN</span>
            <h1 className="about-hero__title">
              22+ Years of Dedication.<br />
              <span className="highlight">Millions of Lives Transformed.</span>
            </h1>
            <p className="about-hero__desc">
              Dr. Meenakshi Jain is a renowned Nutrition Expert, Wellness Coach and Social Worker who believes that good nutrition is the foundation of a healthy, happy and disease-free life.
              <br /><br />
              For more than two decades, she has been empowering individuals and communities across India with natural, safe and sustainable diet and lifestyle solutions.
            </p>

            <div className="about-hero__stats">
              <div className="about-stat">
                <div className="about-stat__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <strong>22+</strong>
                <span>Years of<br />Experience</span>
              </div>
              <div className="about-stat">
                <div className="about-stat__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><line x1="12" y1="8" x2="12" y2="14"></line><line x1="9" y1="11" x2="15" y2="11"></line></svg>
                </div>
                <strong>10,000+</strong>
                <span>Lives<br />Transformed</span>
              </div>
              <div className="about-stat">
                <div className="about-stat__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                </div>
                <strong>Expert in</strong>
                <span>Nutrition &<br />Wellness</span>
              </div>
              <div className="about-stat">
                <div className="about-stat__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <strong>Pan India</strong>
                <span>Impact</span>
              </div>
            </div>
          </div>
          
          <div className="about-hero__spacer"></div>
          
          <div className="about-hero__card-wrap">
            <div className="about-hero__quote-card">
              <span className="quote-mark">❝</span>
              <p>My mission is to help people achieve lasting health through balanced nutrition, fitness and mindful living.</p>
              <strong>– Dr. Meenakshi Jain</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HER JOURNEY */}
      <section className="journey">
        <div className="container journey__inner">
          <div className="journey__image-wrap">
            <img 
              src="/image copy 3.png" 
              alt="Dr. Meenakshi Jain addressing an audience" 
              className="journey__image"
            />
            <div className="journey__badge">
              <div className="badge-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div>
                <strong>Empowering Women.</strong>
                <span>Building a Healthier India.</span>
              </div>
            </div>
          </div>

          <div className="journey__content">
            <span className="section-label">HER JOURNEY</span>
            <h2 className="section-title">A Passion That Became<br/><span className="highlight">a Purpose</span></h2>
            <p className="journey__desc">
              Dr. Meenakshi Jain began her journey with a simple vision – to heal people naturally through the power of nutrition and positive lifestyle changes.
              <br /><br />
              What started as a passion soon turned into a lifelong mission.
              <br /><br />
              Through her "FAT TO FIT" movement, she provides free health consultations, awareness sessions and personalized guidance to women and families in Punjab, Delhi, Haryana and Himachal Pradesh.
            </p>

            <ul className="journey__list">
              <li><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Ph.D. in Nutrition & Dietetics</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Social Worker & Health Educator</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Certified Nutrition Expert</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> 22+ Years of Practical Experience</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Wellness Coach & Motivator</li>
              <li><svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg> Thousands of Success Stories</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-card-wrapper">
            <div className="mv-card">
              <div className="mv-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><line x1="22" y1="2" x2="14" y2="10"/></svg>
              </div>
              <div className="mv-content">
                <h3>Our Mission</h3>
                <p>To inspire and empower people to transform their lives naturally through nutrition, fitness and self-care.</p>
              </div>
            </div>
            
            <div className="mv-divider"></div>

            <div className="mv-card">
              <div className="mv-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <div className="mv-content">
                <h3>Our Vision</h3>
                <p>To build a healthier India where every individual enjoys the freedom of good health and a disease-free life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE BELIEFS */}
      <section className="beliefs">
        <div className="container beliefs__inner">
          <div className="beliefs__content">
            <span className="section-label">WHAT SHE BELIEVES IN</span>
            <h2 className="section-title">Natural. Balanced. Sustainable.</h2>
            <p className="beliefs__desc">Dr. Meenakshi Jain promotes a holistic approach to health that includes:</p>

            <div className="beliefs__grid">
              <div className="belief-item">
                <div className="belief-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                <span>Natural &<br/>Balanced Nutrition</span>
              </div>
              <div className="belief-item">
                <div className="belief-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg></div>
                <span>Regular<br/>Exercise</span>
              </div>
              <div className="belief-item">
                <div className="belief-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></div>
                <span>Mindful<br/>Living</span>
              </div>
              <div className="belief-item">
                <div className="belief-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
                <span>Emotional<br/>Well-being</span>
              </div>
              <div className="belief-item">
                <div className="belief-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
                <span>Healthy<br/>Family Lifestyle</span>
              </div>
            </div>
          </div>
          <div className="beliefs__image-wrap">
            <img 
              src="/image copy 4.png" 
              alt="Dr. Meenakshi Jain with a group of women" 
              className="beliefs__image"
            />
          </div>
        </div>
      </section>

      {/* 5. IMPACT STATS */}
      <section className="impact">
        <div className="container">
          <div className="section-header">
            <span className="section-label">HER JOURNEY IN ACTION</span>
            <h2 className="section-title">Creating Impact, Changing Lives</h2>
          </div>
          
          <div className="impact__grid">
            <div className="impact-card">
              <div className="impact-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <h3>10,000+</h3>
              <p>Lives Transformed</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <h3>250+</h3>
              <p>Health Camps & Workshops</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <h3>100K+</h3>
              <p>People Guided Across India</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
              <h3>22+</h3>
              <p>Years of Experience in Nutrition</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
              <h3>Countless</h3>
              <p>Smiles & Healthy Families</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
