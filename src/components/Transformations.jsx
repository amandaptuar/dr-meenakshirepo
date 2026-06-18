import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import transformImg from '../assets/transform.png';
import './Transformations.css';

const stories = [
  { name: 'Neha S.', kgs: '-18 KGS', duration: '3 Months Transformation' },
  { name: 'Pooja R.', kgs: '-22 KGS', duration: '4 Months Transformation' },
  { name: 'Amit P.', kgs: '-15 KGS', duration: '3 Months Transformation' },
  { name: 'Kavita M.', kgs: '-25 KGS', duration: '5 Months Transformation' },
  { name: 'Ravi K.', kgs: '-20 KGS', duration: '4 Months Transformation' },
  { name: 'Sunita D.', kgs: '-17 KGS', duration: '3 Months Transformation' },
];

const Transformations = () => {
  const [start, setStart] = useState(0);
  const visible = 4;

  const prev = () => setStart(s => Math.max(0, s - 1));
  const next = () => setStart(s => Math.min(stories.length - visible, s + 1));

  return (
    <section id="transformations" className="transformations">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Real People. Real <span className="highlight">Results.</span>
          </h2>
          <p className="section-subtitle">Amazing transformations through natural nutrition &amp; lifestyle changes.</p>
        </div>

        <div className="transformations__slider-wrap">
          <button className="slider-btn slider-btn--prev" onClick={prev} disabled={start === 0} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="transformations__slider">
            {stories.slice(start, start + visible).map((story, i) => (
              <div key={story.name} className="story-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="story-card__kgs">{story.kgs}</div>
                <div className="story-card__images">
                  <div className="story-card__img-wrap">
                    <img src={transformImg} alt={`${story.name} before`} className="story-card__img story-card__img--before" />
                    <div className="story-card__label story-card__label--before">Before</div>
                  </div>
                  <div className="story-card__img-wrap">
                    <img src={transformImg} alt={`${story.name} after`} className="story-card__img story-card__img--after" />
                    <div className="story-card__label story-card__label--after">After</div>
                  </div>
                </div>
                <div className="story-card__info">
                  <div className="story-card__name">{story.name}</div>
                  <div className="story-card__duration">{story.duration}</div>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-btn slider-btn--next" onClick={next} disabled={start >= stories.length - visible} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="transformations__cta">
          <Link to="/success-stories" className="btn-outline-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
            View More Success Stories
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Transformations;
