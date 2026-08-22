import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, CheckCircle, AlertCircle, Plane, Sparkles, Shield } from 'lucide-react';
import RiveAnimation from './RiveAnimation';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [travelStyle, setTravelStyle] = useState('Adventure');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const avatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  ];

  // Password strength calculation
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, text: 'None', class: '' };
    if (pwd.length < 6) return { level: 1, text: 'Weak (min 6 chars)', class: 'strength-weak' };
    const hasNumbers = /\d/.test(pwd);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    if (pwd.length >= 8 && hasNumbers && hasSpecial) {
      return { level: 3, text: 'Strong', class: 'strength-strong' };
    }
    return { level: 2, text: 'Medium', class: 'strength-medium' };
  };

  const strength = getPasswordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('You must accept the Terms of Service & Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await register(fullName, email, password, 'Traveler');
      setIsLoading(false);
      if (res && res.user) {
        navigate('/dashboard');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    }
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
      {/* Single Card */}
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
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto'
        }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Create Your Account</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Join 150,000+ travelers planning multi-city adventures worldwide.</p>
          </div>

          {errorMessage && (
            <div style={{
              backgroundColor: 'var(--danger-bg)', color: 'var(--danger-text)',
              padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem',
              fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
              border: '1px solid rgba(239,68,68,0.25)'
            }}>
              <AlertCircle size={16} /><span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-name">Full Name *</label>
              <div className="form-input-wrapper">
                <User className="form-input-icon" size={17} />
                <input id="reg-name" type="text" className="form-input" placeholder="Aarav Sharma"
                  value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address *</label>
              <div className="form-input-wrapper">
                <Mail className="form-input-icon" size={17} />
                <input id="reg-email" type="email" className="form-input" placeholder="aarav@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="reg-password">Password *</label>
                <div className="form-input-wrapper">
                  <Lock className="form-input-icon" size={17} />
                  <input id="reg-password" type="password" className="form-input" placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-confirm">Confirm Password *</label>
                <div className="form-input-wrapper">
                  <Lock className="form-input-icon" size={17} />
                  <input id="reg-confirm" type="password" className="form-input" placeholder="••••••••"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
            </div>

            {password && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '-0.35rem' }}>
                Password strength: <strong style={{ color: strength.level === 3 ? '#166534' : (strength.level === 2 ? '#D97706' : '#DC2626') }}>{strength.text}</strong>
              </div>
            )}

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)', marginTop: '2px' }} />
              <span>I agree to GlobeTrotter Terms of Service & Privacy Policy</span>
            </label>

            <button type="submit" className="btn btn-primary" disabled={isLoading}
              style={{ width: '100%', padding: '0.85rem', marginTop: '0.35rem', fontSize: '0.95rem' }}>
              {isLoading ? 'Creating Account in MongoDB...' : <><span>Create My Free Account</span><UserPlus size={17} /></>}
            </button>
          </form>

          <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
              Sign in here
            </button>
          </p>
        </div>

        {/* Right — Animation */}
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
          <RiveAnimation src="/travel-animation.riv" width="100%" height="380px" />
          <div style={{ textAlign: 'center', marginTop: '-1.5rem' }}>
            <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: '2.8rem', fontWeight: 700, marginBottom: '0', color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: '1.2' }}>Travel Without Borders</h2>
            <p style={{ fontFamily: '"Caveat", cursive', color: 'var(--text-secondary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '0', lineHeight: '1.3' }}>Join 150,000+ travelers creating custom itineraries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
