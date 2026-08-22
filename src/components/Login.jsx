import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, User, Compass, AlertCircle } from 'lucide-react';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@globetrotter.travel');
  const [password, setPassword] = useState('adminpassword');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) { setErrorMessage('Please fill in both email and password fields.'); return; }
    if (!email.includes('@')) { setErrorMessage('Please enter a valid email address.'); return; }
    setIsLoading(true);
    try {
      const res = await login(email, password);
      setIsLoading(false);
      if (res && res.user) {
        navigate(res.user.role === 'Admin' ? '/admin' : '/dashboard');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Login failed. Please check credentials.');
    }
  };

  const setDemoAccount = (demoEmail, demoPass = 'adminpassword') => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--bg-page)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      {/* Single Card — 50/50 */}
      <div className="animate-fade-in" style={{
        display: 'flex',
        width: '100%',
        maxWidth: '980px',
        minHeight: '600px',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.14)',
        border: '1px solid var(--border)'
      }}>

        {/* Left — Form (50%) */}
        <div style={{
          flex: '0 0 50%',
          backgroundColor: 'var(--bg-surface)',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto'
        }}>
          {/* Logo + Title */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              backgroundColor: 'var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', marginBottom: '1.25rem',
              boxShadow: '0 4px 14px rgba(193,68,14,0.35)'
            }}>
              <Compass size={28} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to manage your GlobeTrotter itineraries & budgets</p>
          </div>

          {/* Error */}
          {errorMessage && (
            <div style={{
              backgroundColor: 'var(--danger-bg)', color: 'var(--danger-text)',
              padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1.25rem',
              fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
              border: '1px solid rgba(239,68,68,0.25)'
            }}>
              <AlertCircle size={16} /><span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email Address</label>
              <div className="form-input-wrapper">
                <Mail className="form-input-icon" size={17} />
                <input id="login-email" type="email" className="form-input" placeholder="name@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">
                <label htmlFor="login-password">Password</label>
                <button type="button" onClick={() => navigate('/forgot-password')}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
                  Forgot Password?
                </button>
              </div>
              <div className="form-input-wrapper">
                <Lock className="form-input-icon" size={17} />
                <input id="login-password" type={showPassword ? 'text' : 'password'} className="form-input"
                  placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="toggle-password-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)' }} />
              <span>Remember me for 30 days</span>
            </label>

            <button type="submit" className="btn btn-primary" disabled={isLoading}
              style={{ width: '100%', padding: '0.9rem', marginTop: '0.25rem', fontSize: '0.95rem' }}>
              {isLoading ? 'Authenticating...' : <><span>Sign In to GlobeTrotter</span><ArrowRight size={17} /></>}
            </button>
          </form>

          {/* Demo Presets */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.65rem', textAlign: 'center' }}>
              ⚡ Fast Demo Credentials
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {[
                { label: 'Admin', email: 'admin@globetrotter.travel', pass: 'adminpassword', icon: <ShieldCheck size={15} /> },
                { label: 'Traveler', email: 'aarav.sharma@example.com', pass: 'password123', icon: <User size={15} /> },
              ].map(d => (
                <button key={d.label} type="button" onClick={() => setDemoAccount(d.email, d.pass)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0.5rem 0.25rem', gap: '0.2rem' }}>
                  <span style={{ color: 'var(--color-primary)' }}>{d.icon}</span>
                  <span>{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
              Create account
            </button>
          </p>
        </div>

        {/* Right — Animation (50%) */}
        <div style={{
          flex: '0 0 50%',
          backgroundColor: 'var(--bg-page)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem',
          gap: '1.5rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: '2.8rem', fontWeight: 700, marginBottom: '0', color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: '1.2' }}>Plan Your Journey</h2>
            <p style={{ fontFamily: '"Caveat", cursive', color: 'var(--text-secondary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '0', lineHeight: '1.3' }}>Multi-city trips, activities & budgets — all in one place.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
