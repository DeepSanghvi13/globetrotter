import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, CheckCircle, AlertCircle, Plane, Sparkles, Shield } from 'lucide-react';
import RiveAnimation from './RiveAnimation';

export const Register = () => {
  const { setCurrentUser } = useAuth();
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
        {/* Left — Form (45%) */}
        <div style={{
          flex: '0 0 50%',
          backgroundColor: 'var(--bg-surface)',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto'
        }}>
        <div className="auth-header">
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            margin: '0 auto 1rem',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <UserPlus size={30} />
          </div>
          <h2 className="auth-title">Join GlobeTrotter</h2>
          <p className="auth-subtitle">Create your personal travel account and start planning multi-city journeys</p>
        </div>

        {errorMessage && (
          <div style={{
            backgroundColor: 'var(--danger-bg)',
            color: 'var(--danger-text)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Avatar Selector */}
          <div className="form-group">
            <label className="form-label">Choose Avatar Profile</label>
            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', margin: '0.35rem 0 0.85rem' }}>
              {avatars.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Avatar option ${index + 1}`}
                  onClick={() => setSelectedAvatar(index)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedAvatar === index ? '3px solid var(--color-primary)' : '2px solid var(--border-strong)',
                    transform: selectedAvatar === index ? 'scale(1.1)' : 'scale(1)',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <div className="form-input-wrapper">
              <User className="form-input-icon" size={18} />
              <input
                id="reg-name"
                type="text"
                className="form-input"
                placeholder="e.g. Aarav Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <div className="form-input-wrapper">
              <Mail className="form-input-icon" size={18} />
              <input
                id="reg-email"
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-pass">Password</label>
              <div className="form-input-wrapper">
                <Lock className="form-input-icon" size={18} />
                <input
                  id="reg-pass"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
              <div className="form-input-wrapper">
                <Lock className="form-input-icon" size={18} />
                <input
                  id="reg-confirm"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Password Strength Meter */}
          {password && (
            <div style={{ marginBottom: '1.25rem', marginTop: '-0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <span>Password Strength:</span>
                <span style={{ fontWeight: 600, color: strength.level === 3 ? '#10B981' : strength.level === 2 ? '#F59E0B' : '#EF4444' }}>
                  {strength.text}
                </span>
              </div>
              <div className="strength-bar-container">
                <div className={`strength-bar-fill ${strength.class}`} />
              </div>
            </div>
          )}

          {/* Travel Style Selector */}
          <div className="form-group">
            <label className="form-label">Preferred Travel Style</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
              {['Adventure', 'Solo', 'Family', 'Luxury'].map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => setTravelStyle(style)}
                  className={`btn btn-sm ${travelStyle === style ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.75rem', padding: '0.5rem 0.2rem' }}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Checkbox */}
          <div style={{ margin: '1.25rem 0', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ accentColor: 'var(--color-primary)', marginTop: '3px' }}
              />
              <span>I agree to GlobeTrotter's Terms of Service, Privacy Policy, and travel guidelines.</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: '100%', padding: '0.85rem' }}
          >
            {isLoading ? 'Creating GlobeTrotter Account...' : (
              <>
                <CheckCircle size={18} />
                <span>Complete Registration</span>
              </>
            )}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--text-secondary)'
        }}>
          Already registered?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            Log in to your account
          </button>
        </div>
        </div>

        {/* Right — Animation (50%) — no terracotta */}
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
            <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: '2.8rem', fontWeight: 700, marginBottom: '0', color: 'var(--text-primary)', letterSpacing: '0.02em', lineHeight: '1.2' }}>Start Your Adventure</h2>
            <p style={{ fontFamily: '"Caveat", cursive', color: 'var(--text-secondary)', fontSize: '1.5rem', fontWeight: 600, marginTop: '0', lineHeight: '1.3' }}>Join thousands of travellers planning smarter trips.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
