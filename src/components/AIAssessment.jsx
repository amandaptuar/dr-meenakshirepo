import React from 'react';
import { Link } from 'react-router-dom';
import './AIAssessment.css';

const insights = [
  'Your memory is strong',
  'Stress is slightly elevated',
  'Focus can be improved',
];

const actionPlan = [
  'Practice 15 mins mindfulness daily',
  'Improve sleep quality (7-8 hours)',
  'Engage in brain training 2x week',
];

const scores = [
  { label: 'Overall Score', value: 78, max: 100, color: '#c8102e', grade: 'Good' },
  { label: 'Mental Well-being', value: 72, max: 100, color: '#f59e0b', grade: 'Good' },
  { label: 'Focus & Attention', value: 81, max: 100, color: '#10b981', grade: 'Excellent' },
  { label: 'Stress Level', value: 35, max: 100, color: '#6366f1', grade: 'Low' },
];

const AIAssessment = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="ai-assessment" className="ai-assessment">
      <div className="container ai-assessment__inner">
        {/* LEFT: Text */}
        <div className="ai-assessment__content">
          <h2 className="ai-assessment__title">AI-Powered Cognitive Health Assessment</h2>
          <p className="ai-assessment__desc">
            Get your personalized AI report analyzing your cognitive health, stress levels, focus, memory and overall well-being.
          </p>

          <ul className="ai-assessment__features">
            {[
              'Takes less than 5 minutes',
              'AI-powered insights',
              'Personalized action plan',
              '100% Secure & Confidential',
            ].map(f => (
              <li key={f} className="ai-feature">
                <span className="ai-feature__check">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <Link to="/assessment" className="btn-primary ai-assessment__cta" style={{ display: 'inline-flex', alignItems: 'center' }}>
            Start Assessment
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* RIGHT: Dashboard Preview */}
        <div className="ai-assessment__dashboard">
          {/* Sidebar */}
          <div className="dashboard-sidebar">
            <div className="dashboard-sidebar__title">Your AI Report</div>
            {['Overview', 'Cognitive Scores', 'Insights', 'Action Plan', 'Progress', 'Recommendations'].map((item, i) => (
              <div key={item} className={`sidebar-item ${i === 0 ? 'sidebar-item--active' : ''}`}>
                <span className="sidebar-item__dot" />
                {item}
              </div>
            ))}
          </div>

          {/* Main Report */}
          <div className="dashboard-main">
            <div className="dashboard-main__header">
              <div>
                <h3 className="dashboard-main__heading">
                  Your AI Report.<br />
                  Deep Insights.<br />
                  <span className="dashboard-main__heading--blue">Better Decisions.</span>
                </h3>
                <p className="dashboard-main__subtitle">Your personalized cognitive health report with insights and action plan to improve your overall well-being.</p>
              </div>
            </div>

            {/* Score Cards */}
            <div className="score-cards">
              {scores.map(s => (
                <div key={s.label} className="score-card">
                  <div className="score-card__label">{s.label}</div>
                  <div className="score-card__value" style={{ color: s.color }}>{s.value}</div>
                  <div className="score-card__grade">{s.grade}</div>
                  <div className="score-card__bar">
                    <div className="score-card__bar-fill" style={{ width: `${s.value}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Key Insights & Action Plan */}
            <div className="dashboard-insights">
              <div>
                <div className="insights-title">Key Insights</div>
                <ul className="insights-list">
                  {insights.map(i => (
                    <li key={i} className="insights-item">
                      <span className="insights-dot insights-dot--blue" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="insights-title">Action Plan</div>
                <ul className="insights-list">
                  {actionPlan.map(a => (
                    <li key={a} className="insights-item">
                      <span className="insights-dot insights-dot--green" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="report-summary">
                <div className="report-circle">
                  <svg viewBox="0 0 44 44" width="90" height="90">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="#eee" strokeWidth="4"/>
                    <circle cx="22" cy="22" r="18" fill="none" stroke="var(--primary)" strokeWidth="4"
                      strokeDasharray="113" strokeDashoffset="28" strokeLinecap="round" transform="rotate(-90 22 22)"/>
                  </svg>
                  <div className="report-circle__value">78</div>
                </div>
                <div className="report-summary__label">Report Summary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssessment;
