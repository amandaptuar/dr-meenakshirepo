import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew]                 = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [error, setError]                     = useState(null);
  const [success, setSuccess]                 = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [session, setSession]                 = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/');
      else setSession(session);
    });
  }, [navigate]);

  const strength = (pw) => {
    if (!pw) return null;
    if (pw.length < 6) return { label: 'Too short', color: '#ef4444', width: '20%' };
    if (pw.length < 8) return { label: 'Weak', color: '#f97316', width: '40%' };
    if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: 'Fair', color: '#f59e0b', width: '65%' };
    return { label: 'Strong', color: '#10b981', width: '100%' };
  };

  const pwStrength = strength(newPassword);

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirmPassword) return setError('Passwords do not match.');
    if (newPassword.length < 6) return setError('Password must be at least 6 characters.');

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;

      await supabase.from('users').update({ requires_password_reset: false }).eq('id', session.user.id);

      setSuccess(true);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  const inputStyle = (focused) => ({
    width: '100%',
    padding: '14px 48px 14px 18px',
    borderRadius: '12px',
    border: `2px solid ${focused ? '#d4143a' : '#e5e7eb'}`,
    fontSize: '16px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    background: '#fafafa',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
    color: '#0f172a',
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #f0f9ff 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: '100%', maxWidth: '460px',
        background: '#fff', borderRadius: '24px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.10)',
        overflow: 'hidden',
      }}>

        {/* Header bar */}
        <div style={{
          background: 'linear-gradient(135deg, #d4143a, #ff6b6b)',
          padding: '36px 40px 32px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>
            Secure Your Account
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: '8px', fontSize: '15px', lineHeight: 1.5 }}>
            Choose a strong permanent password to protect your wellness report.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: '36px 40px 40px' }}>

          {/* Success state */}
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 style={{ color: '#0f172a', fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Password Updated!</h2>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Redirecting you to your dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleReset}>

              {/* Error */}
              {error && (
                <div style={{
                  background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c',
                  padding: '14px 16px', borderRadius: '10px', fontSize: '15px',
                  marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              {/* New Password */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  New Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    style={inputStyle(false)}
                    onFocus={e => e.target.style.borderColor = '#d4143a'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    style={{
                      position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px',
                    }}
                  >
                    {showNew
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>

                {/* Strength bar */}
                {pwStrength && (
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>Password strength</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: pwStrength.color }}>{pwStrength.label}</span>
                    </div>
                    <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: pwStrength.width, background: pwStrength.color, borderRadius: '4px', transition: 'width 0.3s, background 0.3s' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    required
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    style={{
                      ...inputStyle(false),
                      borderColor: confirmPassword && confirmPassword !== newPassword ? '#ef4444' : '#e5e7eb',
                    }}
                    onFocus={e => e.target.style.borderColor = '#d4143a'}
                    onBlur={e => e.target.style.borderColor = confirmPassword && confirmPassword !== newPassword ? '#ef4444' : '#e5e7eb'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{
                      position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px',
                    }}
                  >
                    {showConfirm
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
                {confirmPassword && confirmPassword !== newPassword && (
                  <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>Passwords do not match</p>
                )}
                {confirmPassword && confirmPassword === newPassword && (
                  <p style={{ color: '#10b981', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>✓ Passwords match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '16px',
                  background: loading ? '#e5e7eb' : 'linear-gradient(135deg, #d4143a, #ff6b6b)',
                  color: loading ? '#94a3b8' : '#fff',
                  border: 'none', borderRadius: '12px',
                  fontSize: '17px', fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.01em',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width: '18px', height: '18px', border: '2px solid #94a3b8', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    Updating...
                  </>
                ) : 'Set Password & Continue'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#94a3b8' }}>
                Your password is encrypted and stored securely.
              </p>
            </form>
          )}

        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ResetPassword;
