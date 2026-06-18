import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password, analysisData, user } = location.state || {};

  if (!email || !analysisData) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#111', marginBottom: '16px' }}>Session Expired</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Please complete the assessment first.</p>
        <button className="btn-primary" onClick={() => navigate('/assessment')}>Start Assessment</button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff5f5 0%, #fff 50%, #f0f9ff 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '560px', width: '100%',
        background: '#fff', borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
        overflow: 'hidden'
      }}>
        {/* Green success header */}
        <div style={{ background: 'linear-gradient(135deg, #10b981, #059669)', padding: '40px 40px 32px', textAlign: 'center' }}>
          <div style={{
            width: '72px', height: '72px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 800, margin: 0 }}>Assessment Complete!</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '10px', fontSize: '15px' }}>
            Your cognitive wellness report has been generated and saved.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '32px 40px 40px' }}>
          
          {/* Credentials Box */}
          <div style={{
            background: '#fef9ec',
            border: '1px solid #fcd34d',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '22px' }}>🔐</span>
              <h3 style={{ color: '#92400e', fontSize: '16px', fontWeight: 700, margin: 0 }}>Save Your Login Credentials</h3>
            </div>
            <p style={{ color: '#78350f', fontSize: '13px', marginBottom: '18px', lineHeight: 1.6 }}>
              An account has been created for you. Use these to log in and access your dashboard and PDF report anytime.
            </p>

            <div style={{ background: '#fff', borderRadius: '8px', padding: '16px', border: '1px solid #fde68a' }}>
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#b45309', fontWeight: 700, letterSpacing: '1px', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a', wordBreak: 'break-all' }}>{email}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#b45309', fontWeight: 700, letterSpacing: '1px', marginBottom: '4px' }}>Temporary Password</div>
                <div style={{
                  fontSize: '20px', fontWeight: 800, color: '#d4143a',
                  letterSpacing: '2px', fontFamily: 'monospace',
                  background: '#fff5f5', padding: '8px 12px', borderRadius: '6px',
                  display: 'inline-block'
                }}>{password}</div>
              </div>
            </div>
          </div>

          {/* Go to Dashboard */}
          <button
            className="btn-primary w-100"
            onClick={() => navigate('/dashboard', { state: { analysisData, user } })}
            style={{ padding: '18px', fontSize: '17px', fontWeight: 700, borderRadius: '12px' }}
          >
            View My Dashboard & Report →
          </button>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#999' }}>
            You are now logged in. You can also log in anytime with the credentials above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
