import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);

    // Case 1: Data passed via navigation (e.g. right after assessment)
    if (location.state?.analysisData) {
      setAnalysisData(location.state.analysisData);
      setUser(location.state.user);
      if (location.state.user?.latest_pdf_base64) {
        setPdfUrl(location.state.user.latest_pdf_base64);
      }
      setLoading(false);
      return;
    }

    // Case 2: Direct navigation (e.g. clicking Dashboard from Navbar)
    // Fetch everything from Supabase
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/assessment');
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (fetchError || !data) {
        setError('Could not load your dashboard. Please try again.');
        setLoading(false);
        return;
      }

      setUser(data);
      if (data.latest_pdf_base64) setPdfUrl(data.latest_pdf_base64);

      if (data.latest_assessment_data) {
        setAnalysisData(data.latest_assessment_data);
      } else {
        setError('No assessment data found. Please complete the assessment first.');
      }
    } catch (e) {
      setError('Failed to load dashboard: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewPdf = async () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
      return;
    }
    setLoadingPdf(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('users')
          .select('latest_pdf_base64')
          .eq('id', session.user.id)
          .single();
        if (data?.latest_pdf_base64) {
          setPdfUrl(data.latest_pdf_base64);
          window.open(data.latest_pdf_base64, '_blank');
          return;
        }
      }
      setError('PDF not available yet. Please try again in a moment.');
    } catch {
      setError('Failed to load PDF. Please contact support.');
    } finally {
      setLoadingPdf(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #f0f0f0', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: '#666', fontSize: '16px' }}>Loading your dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Error / No data
  if (!analysisData) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '48px' }}>📊</div>
        <h2 style={{ color: '#111' }}>No Assessment Found</h2>
        <p style={{ color: '#666', maxWidth: '400px' }}>{error || 'You have not completed a cognitive assessment yet.'}</p>
        <button className="btn-primary" onClick={() => navigate('/assessment')} style={{ marginTop: '8px' }}>
          Start Assessment
        </button>
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ marginTop: '8px' }}>
          Back to Home
        </button>
      </div>
    );
  }

  const { overall, cognitiveAge, strengths, recommendations, charts } = analysisData;

  const radarData = charts.radarDomains.labels.map((label, index) => ({
    subject: label.replace(/([A-Z])/g, ' $1').trim(),
    A: charts.radarDomains.values[index],
    fullMark: 100,
  }));

  const barData = charts.barLifestyleImpacts.labels.map((label, index) => ({
    name: label.replace('Impact', '').replace(/([A-Z])/g, ' $1').trim(),
    Impact: charts.barLifestyleImpacts.values[index],
  }));

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getImpactColor = (val) => {
    if (val === 0) return '#10b981';
    if (val === 1) return '#f59e0b';
    return '#ef4444';
  };

  const displayCognitiveAge = cognitiveAge.estimatedCognitiveAge !== null
    ? cognitiveAge.estimatedCognitiveAge
    : Math.max(cognitiveAge.actualAge - 10, Math.round(cognitiveAge.actualAge + ((70 - overall.score) * 0.4)));

  return (
    <div className="dashboard-page">
      <div className="container">

        {/* Header */}
        <header className="dash-header" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
            <button
              className="btn-secondary"
              onClick={() => navigate('/')}
              style={{ padding: '8px 20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Home
            </button>

            <button
              className="btn-primary"
              onClick={handleViewPdf}
              disabled={loadingPdf}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {loadingPdf ? 'Loading...' : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  View PDF Report
                </>
              )}
            </button>
          </div>

          <div>
            <span className="dash-eyebrow">YOUR PERSONALIZED REPORT</span>
            <h1 className="dash-title">Hello{user?.name ? `, ${user.name}` : ''}! Here is your Cognitive Profile.</h1>
          </div>
        </header>

        {error && <div className="dash-error">{error}</div>}

        {/* KPI Cards */}
        <div className="dash-kpis">
          <div className="dash-kpi-card" style={{ borderTop: `4px solid ${getScoreColor(overall.score)}` }}>
            <span className="kpi-label">Overall Wellness Score</span>
            <div className="kpi-val" style={{ color: getScoreColor(overall.score) }}>{overall.score.toFixed(0)}</div>
            <span className="kpi-desc">Rating: <strong>{overall.rating}</strong></span>
          </div>

          <div className="dash-kpi-card" style={{ borderTop: '4px solid var(--primary)' }}>
            <span className="kpi-label">Chronological Age</span>
            <div className="kpi-val" style={{ color: '#111' }}>{cognitiveAge.actualAge}</div>
            <span className="kpi-desc">Years Old</span>
          </div>

          <div className="dash-kpi-card" style={{ borderTop: '4px solid #3b82f6' }}>
            <span className="kpi-label">Cognitive Age Estimate</span>
            <div className="kpi-val" style={{ color: '#3b82f6' }}>{displayCognitiveAge}</div>
            <span className="kpi-desc" style={{ fontSize: '10px' }}>{cognitiveAge.disclaimer}</span>
          </div>
        </div>

        {/* Charts */}
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

        {/* Insights */}
        <div className="dash-insights">
          {strengths && strengths.length > 0 && (
            <div className="insight-box">
              <h3 className="insight-title" style={{ color: '#10b981' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                Recommendations
              </h3>
              <ul className="insight-list">
                {recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)}
              </ul>
            </div>
          )}
        </div>

        {analysisData.riskIndicators && analysisData.riskIndicators.length > 0 && (
          <div className="dash-insights" style={{ marginTop: '24px', gridTemplateColumns: '1fr' }}>
            <div className="insight-box" style={{ borderLeft: '4px solid #f97316' }}>
              <h3 className="insight-title" style={{ color: '#f97316' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                Risk Indicators
              </h3>
              <ul className="insight-list">
                {analysisData.riskIndicators.map((risk, idx) => <li key={idx} style={{ color: '#444' }}>{risk}</li>)}
              </ul>
            </div>
          </div>
        )}

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
