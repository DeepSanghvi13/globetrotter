import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Compass, Sun, Moon, LogIn, UserPlus, LayoutDashboard,
  UserCheck, LogOut, ShieldCheck, History, Info, Headphones,
  Menu, X, User, ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hamburger drawer state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  // Avatar URL resolution
  const userAvatar = currentUser?.avatar || (
    currentUser?.name
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=C1440E&color=ffffff&bold=true`
      : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  );

  return (
    <header className="glass-navbar" style={{ position: 'relative', zIndex: 1000 }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        
        {/* LEFT SIDE: Hamburger Button (≡) + Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          
          {/* Hamburger Menu Toggle Button (Left Positioned) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: isMenuOpen ? 'var(--color-primary)' : 'var(--bg-surface)',
              color: isMenuOpen ? '#FFFFFF' : 'var(--text-primary)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-strong)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
            title="Open Navigation Menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleNavigate(currentUser ? (currentUser.role === 'Admin' ? '/admin' : '/dashboard') : '/login')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-glow)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Compass size={22} />
            </div>
            <div>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}>
                GlobeTrotter
                <span style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}>PRO</span>
              </h1>
              <p style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Personalized Multi-City Travel Planner
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDE: User Profile Badge with Image Avatar + Theme Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* User Name & Profile Image Pill */}
          {currentUser ? (
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'var(--bg-surface)',
                backdropFilter: 'blur(10px)',
                padding: '0.35rem 0.85rem 0.35rem 0.35rem',
                borderRadius: '999px',
                border: '1px solid var(--border-strong)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
            >
              {/* Profile Image Avatar */}
              <img
                src={userAvatar}
                alt={currentUser.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid var(--color-primary)'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                  {currentUser.name}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  {currentUser.role || 'Traveler'}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleNavigate('/login')}
              className="btn btn-sm btn-primary"
              style={{ borderRadius: '999px', padding: '0.35rem 1rem' }}
            >
              <LogIn size={15} />
              <span>Login</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-surface)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border-strong)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(15deg) scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

        </div>
      </div>

      {/* Hamburger Dropdown Drawer Modal (Left Aligned) */}
      {isMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: '1.5rem',
            width: '320px',
            backgroundColor: 'var(--bg-surface)',
            backdropFilter: 'blur(25px)',
            borderRadius: 'var(--radius-xl)',
            border: '1.5px solid var(--border-strong)',
            boxShadow: 'var(--shadow-xl)',
            padding: '1.25rem',
            zIndex: 1100
          }}
        >
          {/* User Profile Card Header */}
          {currentUser ? (
            <div style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <img
                src={userAvatar}
                alt={currentUser.name}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--color-primary)'
                }}
              />
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                    {currentUser.role || 'Traveler'}
                  </span>
                  <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{currentUser.email}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-page)',
              border: '1px solid var(--border)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                Welcome to GlobeTrotter! ✈️
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Sign in to manage itineraries & tickets
              </div>
            </div>
          )}

          {/* Navigation Action Buttons List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {currentUser && currentUser.role !== 'Admin' && (
              <>
                <button
                  type="button"
                  onClick={() => handleNavigate('/dashboard')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: isActive('/dashboard') ? 'var(--color-primary)' : 'transparent',
                    backgroundColor: isActive('/dashboard') ? 'var(--bg-page)' : 'transparent',
                    color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <LayoutDashboard size={18} style={{ color: 'var(--color-primary)' }} />
                    <span>Planner Hub</span>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('/history')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: isActive('/history') ? 'var(--color-primary)' : 'transparent',
                    backgroundColor: isActive('/history') ? 'var(--bg-page)' : 'transparent',
                    color: isActive('/history') ? 'var(--color-primary)' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <History size={18} style={{ color: 'var(--color-primary)' }} />
                    <span>History & Passes</span>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => handleNavigate('/about')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid',
                borderColor: isActive('/about') ? 'var(--color-primary)' : 'transparent',
                backgroundColor: isActive('/about') ? 'var(--bg-page)' : 'transparent',
                color: isActive('/about') ? 'var(--color-primary)' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Info size={18} style={{ color: 'var(--color-primary)' }} />
                <span>About Us</span>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>

            <button
              type="button"
              onClick={() => handleNavigate('/contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid',
                borderColor: isActive('/contact') ? 'var(--color-primary)' : 'transparent',
                backgroundColor: isActive('/contact') ? 'var(--bg-page)' : 'transparent',
                color: isActive('/contact') ? 'var(--color-primary)' : 'var(--text-primary)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Headphones size={18} style={{ color: 'var(--color-primary)' }} />
                <span>Contact Us</span>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
            </button>

            {currentUser?.role === 'Admin' && (
              <button
                type="button"
                onClick={() => handleNavigate('/admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: isActive('/admin') ? 'var(--color-primary)' : 'transparent',
                  backgroundColor: isActive('/admin') ? 'var(--bg-page)' : 'transparent',
                  color: isActive('/admin') ? 'var(--color-primary)' : 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--color-primary)' }} />
                  <span>Admin Panel</span>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-secondary)' }} />
              </button>
            )}

            {!currentUser ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <button
                  type="button"
                  onClick={() => handleNavigate('/login')}
                  className="btn btn-primary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('/register')}
                  className="btn btn-outline"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <UserPlus size={16} />
                  <span>Create Account</span>
                </button>
              </div>
            ) : (
              <div style={{ marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-outline"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#EF4444',
                    borderColor: 'rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
