import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      // Close modal on success
      onClose();

      // Route them appropriately
      const { data: userProfile } = await supabase.from('users').select('*').eq('id', data.user.id).single();

      if (userProfile && userProfile.requires_password_reset) {
        navigate('/reset-password');
      } else {
        if (userProfile && userProfile.latest_assessment_data) {
           navigate('/dashboard', { state: { analysisData: userProfile.latest_assessment_data, user: userProfile } });
        } else {
           navigate('/assessment');
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={e => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>&times;</button>
        <h2 className="login-modal-title">Sign In</h2>
        <p className="login-modal-desc">Enter your credentials to access your dashboard.</p>
        
        {error && <div className="login-modal-error">{error}</div>}

        <form onSubmit={handleLogin} className="login-modal-form">
          <div className="form-group">
            <label>Email Address</label>
            <input 
              required 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              required 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary w-100" disabled={loading} style={{ marginTop: '10px' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
