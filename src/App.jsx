import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { AdminDashboard } from './components/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { HistoryView } from './pages/HistoryView';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Compass, Sun, Moon, Heart } from 'lucide-react';

// Auth pages don't get Navbar / Footer
const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];

function AppLayout() {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}

      {/* Floating theme toggle — always visible on all pages */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-surface)',
          border: 'none',
          color: 'var(--color-primary)',
          display: isAuthPage ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          transition: 'background-color 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public Routes — no navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* User Route — any logged-in user */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Booking & Itinerary History */}
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <HistoryView />
              </ProtectedRoute>
            }
          />

          {/* Public Information Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin-only Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default redirect to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {!isAuthPage && (
        <footer style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-strong)',
          padding: '2rem 1.5rem',
          marginTop: 'auto'
        }}>
          <div style={{
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Compass size={18} />
              </div>
              <div>
                <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>GlobeTrotter</span>
                <span style={{ marginLeft: '0.35rem' }}>— Multi-Stop Travel Engine</span>
              </div>
            </div>

            {/* Footer Navigation Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link to="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                Planner Hub
              </Link>
              <Link to="/history" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                Booking History
              </Link>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                About Us
              </Link>
              <Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600 }}>
                Contact & Support
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span>Theme: <strong>Light (Terracotta) / Dark (Copper)</strong></span>
              <span>Crafted for Odoo Hackathon</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
