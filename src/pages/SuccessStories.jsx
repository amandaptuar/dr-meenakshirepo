import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SuccessStories.css';

const SuccessStories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="success-page">
      {/* 1. HERO SECTION */}
      <section className="success-hero">
        <div className="container success-hero__inner">
          <div className="success-hero__content">
            <span className="section-label">SUCCESS STORIES</span>
            <h1 className="success-hero__title">
              Real People.<br />
              <span className="highlight">Real Results.</span>
            </h1>
            <p className="success-hero__desc">
              Thousands of people have transformed their lives with the right nutrition, expert guidance and consistent support by Dr. Meenakshi Jain.
            </p>

            <div className="success-hero__stats">
              <div className="success-stat">
                <div className="success-stat__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
                <strong>10,000+</strong>
                <span>Lives Transformed</span>
              </div>
              <div className="success-stat">
                <div className="success-stat__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>
                <strong>22+</strong>
                <span>Years of Experience</span>
              </div>
              <div className="success-stat">
                <div className="success-stat__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <strong>100%</strong>
                <span>Natural & Safe</span>
              </div>
              <div className="success-stat">
                <div className="success-stat__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <strong>Pan India</strong>
                <span>Happy Clients</span>
              </div>
            </div>
          </div>
          
          <div className="success-hero__spacer"></div>
          
          <div className="success-hero__card-wrap">
            <div className="success-hero__quote-card">
              <span className="quote-mark">❝</span>
              <p>Every success story inspires us to keep guiding more people towards a healthier, happier and disease-free life.</p>
              <strong>– Dr. Meenakshi Jain</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STORIES GRID */}
      <section className="stories-grid-section">
        <div className="container">
          <div className="stories-filter">
            <div className="filter-pills">
              <button className="filter-pill active">All Stories</button>
              <button className="filter-pill">Weight Loss</button>
              <button className="filter-pill">PCOS / PCOD</button>
              <button className="filter-pill">Diabetes Reversal</button>
              <button className="filter-pill">Obesity Management</button>
              <button className="filter-pill">Thyroid</button>
              <button className="filter-pill">Senior Wellness</button>
            </div>
            <div className="filter-sort">
              <select>
                <option>Sort by: Latest</option>
              </select>
            </div>
          </div>

          <div className="stories-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="story-card">
                <div className="story-image-split">
                  <div className="story-badge">-18 KGS</div>
                  <div className="story-img before">
                    <img src="/image copy 5.png" alt="Before transformation" className="transformation-img" />
                    <span className="img-label before-label">Before</span>
                  </div>
                  <div className="story-img after">
                    <img src="/image copy 5.png" alt="After transformation" className="transformation-img" />
                    <span className="img-label after-label">After</span>
                  </div>
                </div>
                <div className="story-content">
                  <h3 className="story-name">Neha S.</h3>
                  <p className="story-result">Lost 18 Kgs in 3 Months</p>
                  
                  <div className="story-details">
                    <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg> <strong>Program:</strong> Weight Loss Plan</div>
                    <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> <strong>Focus:</strong> Fat Loss, Energy & Confidence</div>
                    <div><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> <strong>Duration:</strong> 3 Months</div>
                  </div>

                  <div className="story-quote">
                    <span className="quote-icon">❝</span>
                    <p>I feel more confident, active and full of energy. Thank you so much Dr. Meenakshi Jain!</p>
                  </div>

                  <button className="btn-outline-red" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Read Neha's Story <span>→</span></button>
                </div>
              </div>
            ))}
          </div>

          <div className="stories-more">
            <button className="btn-outline-red large" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>View More Success Stories <span>→</span></button>
          </div>
        </div>
      </section>

      {/* 3. STATS RIBBON */}
      <section className="stats-ribbon">
        <div className="container stats-ribbon__inner">
          <div className="ribbon-stat">
            <div className="ribbon-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg></div>
            <div>
              <h3>135M+</h3>
              <p>Kgs Weight Lost</p>
            </div>
          </div>
          <div className="ribbon-divider"></div>
          <div className="ribbon-stat">
            <div className="ribbon-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg></div>
            <div>
              <h3>98%</h3>
              <p>Clients Satisfied</p>
            </div>
          </div>
          <div className="ribbon-divider"></div>
          <div className="ribbon-stat">
            <div className="ribbon-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg></div>
            <div>
              <h3>22+</h3>
              <p>Years of Experience</p>
            </div>
          </div>
          <div className="ribbon-divider"></div>
          <div className="ribbon-stat">
            <div className="ribbon-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div>
              <h3>100%</h3>
              <p>Natural & Safe</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VIDEO TESTIMONIALS */}
      <section className="videos-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">OUR CLIENTS SPEAK</span>
            <h2 className="section-title">Stories That Inspire</h2>
          </div>

          <div className="videos-carousel">
            <button className="carousel-arrow left"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg></button>
            <div className="videos-grid">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="video-card">
                  <div className="video-thumb">
                    <img src="/image copy 5.png" alt="Video thumbnail" className="video-thumbnail-img" />
                    <button className="play-button" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}><svg viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg></button>
                    <span className="video-duration">1:25</span>
                  </div>
                  <div className="video-info">
                    <h4>Neha's Weight Loss Journey</h4>
                    <p>Lost 18 Kgs in 3 Months</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-arrow right"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></button>
          </div>

          <div className="videos-more">
            <button className="btn-outline-red" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Watch More Videos <span>→</span></button>
          </div>
        </div>
      </section>

      {/* 5. TEXT TESTIMONIALS */}
      <section className="text-reviews">
        <div className="container text-reviews__grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="review-card">
              <div className="stars">
                <svg viewBox="0 0 24 24" fill="var(--primary)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg viewBox="0 0 24 24" fill="var(--primary)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg viewBox="0 0 24 24" fill="var(--primary)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg viewBox="0 0 24 24" fill="var(--primary)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <svg viewBox="0 0 24 24" fill="var(--primary)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <p>The personalized diet and constant support changed my life completely. I never thought weight loss could be this simple!</p>
              <div className="reviewer">
                <div className="reviewer-avatar">R</div>
                <div>
                  <strong>Ritu K.</strong>
                  <span>Delhi</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CUSTOM CTA */}
      <section className="success-cta">
        <div className="container success-cta__inner">
          <div className="success-cta__bg">
            <img src="/image copy.png" alt="Dr. Meenakshi Jain" className="cta-doctor-img" />
            <div className="cta-content">
              <h2>Your Success Story Can Be Next!</h2>
              <p>Take the first step today towards a fitter, healthier and happier you.</p>
              <div className="cta-buttons">
                <Link to="/assessment" className="btn-white" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Start Assessment <span>→</span></Link>
                <button className="btn-outline-white" onClick={() => window.dispatchEvent(new Event('openBookingModal'))}>Book an Appointment <span>→</span></button>
              </div>
            </div>
            <img src="/veggie_bowl.png" alt="Healthy nutrition bowl" className="cta-bowl-img" />
          </div>
        </div>
        
        <div className="success-footer-ribbon">
          <div className="container footer-ribbon__inner">
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <div><strong>Personalized Plans</strong><span>Tailored for You</span></div>
            </div>
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <div><strong>Expert Guidance</strong><span>By Dr. Meenakshi Jain</span></div>
            </div>
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              <div><strong>Proven Results</strong><span>Real Transformations</span></div>
            </div>
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>
              <div><strong>Pan India Impact</strong><span>Helping People Everywhere</span></div>
            </div>
            <div className="fr-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/></svg>
              <div><strong>100% Natural</strong><span>Nutrition & Diet Plans</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
