import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import './Dashboard.css';

const API_BASE = '/api/v1';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [error, setError] = useState(null);

  const { analysisData, user } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!analysisData) {
      navigate('/assessment');
    }
  }, [analysisData, navigate]);

  if (!analysisData) return null;

  const { overall, cognitiveAge, domains, lifestyleImpacts, strengths, recommendations, charts } = analysisData;

  // Format data for Recharts
  const radarData = charts.radarDomains.labels.map((label, index) => ({
    subject: label.replace(/([A-Z])/g, ' $1').trim(), // Add space before capital letters
    A: charts.radarDomains.values[index],
    fullMark: 100,
  }));

  const barData = charts.barLifestyleImpacts.labels.map((label, index) => {
    // Label comes back as SleepQualityImpact etc, clean it up
    const cleanLabel = label.replace('Impact', '').replace(/([A-Z])/g, ' $1').trim();
    return {
      name: cleanLabel,
      Impact: charts.barLifestyleImpacts.values[index],
    };
  });

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Yellow/Orange
    if (score >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getImpactColor = (val) => {
    if (val === 0) return '#10b981'; // Low impact (good)
    if (val === 1) return '#f59e0b'; // Moderate
    return '#ef4444'; // High impact
  };

  const downloadPdf = async () => {
    setIsGeneratingPdf(true);
    setError(null);
    try {
      const payload = {
        analysis: analysisData,
        brand: {
          primaryColor: "#d4143a",
          accentColor: "#222222",
          footerNote: "Dr. Meenakshi Jain - Nutrition & Wellness"
        }
      };

      const res = await fetch(`${API_BASE}/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to generate PDF report.');

      // Response is a PDF blob
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Cognitive_Wellness_Report_${user?.name?.replace(/\s+/g, '_') || 'User'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const displayCognitiveAge = cognitiveAge.estimatedCognitiveAge !== null 
    ? cognitiveAge.estimatedCognitiveAge 
    : Math.max(cognitiveAge.actualAge - 10, Math.round(cognitiveAge.actualAge + ((70 - overall.score) * 0.4)));

  return (
    <div className="dashboard-page">
      <div className="container">
        
        {/* Header */}
        <header className="dash-header">
          <div>
            <span className="dash-eyebrow">YOUR PERSONALIZED REPORT</span>
            <h1 className="dash-title">Hello{user?.name ? `, ${user.name}` : ''}! Here is your Cognitive Profile.</h1>
          </div>
          <button 
            className="btn-primary" 
            onClick={downloadPdf} 
            disabled={isGeneratingPdf}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isGeneratingPdf ? 'Generating...' : 'Download PDF Report'}
            {!isGeneratingPdf && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>}
          </button>
        </header>

        {error && <div className="dash-error">{error}</div>}

        {/* Top KPI Cards */}
        <div className="dash-kpis">
          <div className="dash-kpi-card" style={{ borderTop: `4px solid ${getScoreColor(overall.score)}` }}>
            <span className="kpi-label">Overall Wellness Score</span>
            <div className="kpi-val" style={{ color: getScoreColor(overall.score) }}>{overall.score.toFixed(0)}</div>
            <span className="kpi-desc">Rating: <strong>{overall.rating}</strong></span>
          </div>
          
          <div className="dash-kpi-card" style={{ borderTop: `4px solid var(--primary)` }}>
            <span className="kpi-label">Chronological Age</span>
            <div className="kpi-val" style={{ color: '#111' }}>{cognitiveAge.actualAge}</div>
            <span className="kpi-desc">Years Old</span>
          </div>

          <div className="dash-kpi-card" style={{ borderTop: `4px solid #3b82f6` }}>
            <span className="kpi-label">Cognitive Age Estimate</span>
            <div className="kpi-val" style={{ color: '#3b82f6' }}>
              {displayCognitiveAge}
            </div>
            <span className="kpi-desc" style={{ fontSize: '10px' }}>{cognitiveAge.disclaimer}</span>
          </div>
        </div>

        {/* Charts Section */}
        <div className="dash-charts">
          <div className="dash-chart-card">
            <h3 className="chart-title">Cognitive Domains Breakdown</h3>
            <div className="chart-wrapper" style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#eee" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#aaa' }} />
                  <Radar name="Score" dataKey="A" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dash-chart-card">
            <h3 className="chart-title">Lifestyle Impact Factors</h3>
            <p className="chart-subtitle">Lower is better. Shows how lifestyle affects your cognition.</p>
            <div className="chart-wrapper" style={{ height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#666' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 2]} ticks={[0, 1, 2]} tickFormatter={(val) => ['Low', 'Mod', 'High'][val]} tick={{ fontSize: 10, fill: '#888' }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#f5f5f5' }} formatter={(val) => ['Low Impact', 'Moderate Impact', 'High Impact'][val]} />
                  <Bar dataKey="Impact" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getImpactColor(entry.Impact)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Textual Insights */}
        <div className="dash-insights">
          {strengths && strengths.length > 0 && (
            <div className="insight-box">
              <h3 className="insight-title" style={{ color: '#10b981' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Key Strengths
              </h3>
              <ul className="insight-list">
                {strengths.map((str, idx) => <li key={idx}>{str}</li>)}
              </ul>
            </div>
          )}

          {recommendations && recommendations.length > 0 && (
            <div className="insight-box">
              <h3 className="insight-title" style={{ color: '#3b82f6' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Actionable Recommendations
              </h3>
              <ul className="insight-list">
                {recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Risk Indicators */}
        {analysisData.riskIndicators && analysisData.riskIndicators.length > 0 && (
          <div className="dash-insights" style={{ marginTop: '24px', gridTemplateColumns: '1fr' }}>
            <div className="insight-box" style={{ borderLeft: '4px solid #f97316' }}>
              <h3 className="insight-title" style={{ color: '#f97316' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Risk Indicators
              </h3>
              <ul className="insight-list">
                {analysisData.riskIndicators.map((risk, idx) => <li key={idx} style={{ color: '#444' }}>{risk}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* Disclaimers & Privacy */}
        <div style={{ marginTop: '40px', padding: '24px', background: '#f1f5f9', borderRadius: '8px', fontSize: '12px', color: '#64748b' }}>
          <h4 style={{ marginBottom: '8px', color: '#475569' }}>Disclaimers & Privacy</h4>
          {analysisData.disclaimers && analysisData.disclaimers.map((d, i) => <p key={i} style={{ margin: '4px 0' }}>{d}</p>)}
          {analysisData.privacy && <p style={{ margin: '8px 0 0 0', fontStyle: 'italic' }}>{analysisData.privacy.storagePolicy}</p>}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
