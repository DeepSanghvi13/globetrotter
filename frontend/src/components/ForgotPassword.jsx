import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(45);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid registered email address.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 600);
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next box
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 600);
  };

  const handleStep3Submit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 700);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card animate-fade-in">
        {/* Step Indicator Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                width: s === step ? '32px' : '10px',
                height: '10px',
                borderRadius: '999px',
                backgroundColor: s <= step ? 'var(--color-primary)' : 'var(--border-strong)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
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

        {/* STEP 1: REQUEST OTP */}
        {step === 1 && (
          <>
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
                <KeyRound size={30} />
              </div>
              <h2 className="auth-title">Reset Your Password</h2>
              <p className="auth-subtitle">Enter your registered email address and we'll send a 6-digit verification code</p>
            </div>

            <form onSubmit={handleStep1Submit}>
              <div className="form-group">
                <label className="form-label" htmlFor="forgot-email">Email Address</label>
                <div className="form-input-wrapper">
                  <Mail className="form-input-icon" size={18} />
                  <input
                    id="forgot-email"
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {isLoading ? 'Sending Code...' : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        )}

        {/* STEP 2: ENTER OTP */}
        {step === 2 && (
          <>
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
                <Mail size={30} />
              </div>
              <h2 className="auth-title">Enter Verification Code</h2>
              <p className="auth-subtitle">We sent a 6-digit code to <strong>{email}</strong></p>
            </div>

            <form onSubmit={handleStep2Submit}>
              <div className="otp-container">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="otp-input"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Didn't receive the code?{' '}
                <button
                  type="button"
                  onClick={() => alert("New 6-digit code sent to " + email)}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer' }}
                >
                  Resend Code
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {isLoading ? 'Verifying Code...' : 'Verify & Continue'}
              </button>
            </form>
          </>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === 3 && (
          <>
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
                <Lock size={30} />
              </div>
              <h2 className="auth-title">Create New Password</h2>
              <p className="auth-subtitle">Choose a strong, secure password for your GlobeTrotter account</p>
            </div>

            <form onSubmit={handleStep3Submit}>
              <div className="form-group">
                <label className="form-label" htmlFor="new-pass">New Password</label>
                <div className="form-input-wrapper">
                  <Lock className="form-input-icon" size={18} />
                  <input
                    id="new-pass"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm-new-pass">Confirm New Password</label>
                <div className="form-input-wrapper">
                  <Lock className="form-input-icon" size={18} />
                  <input
                    id="confirm-new-pass"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                style={{ width: '100%', padding: '0.85rem' }}
              >
                {isLoading ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          </>
        )}

        {/* STEP 4: SUCCESS */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-bg)',
              color: 'var(--accent-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 25px rgba(74, 222, 128, 0.3)'
            }}>
              <CheckCircle2 size={42} />
            </div>
            <h2 className="auth-title">Password Reset Complete!</h2>
            <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>
              Your GlobeTrotter account password has been updated successfully. You can now sign in with your new credentials.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              Return to Login Screen
            </button>
          </div>
        )}

        {/* Back Link */}
        {step < 4 && (
          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: '0.875rem'
          }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Login</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
