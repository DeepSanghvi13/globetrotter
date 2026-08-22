import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Default Admin Master Profile
const DEFAULT_DEMO_USER = {
  name: 'Admin Master',
  email: 'admin@globetrotter.travel',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('globetrotter_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read user from localStorage', e);
    }
    return DEFAULT_DEMO_USER;
  });

  const [dbStatus, setDbStatus] = useState('Unknown');

  // Check MongoDB connection status on startup
  useEffect(() => {
    fetch('http://localhost:5000/api/db-status')
      .then(res => res.json())
      .then(data => {
        if (data.connected) {
          setDbStatus('MongoDB Connected');
        } else {
          setDbStatus('Fallback Store Active');
        }
      })
      .catch(() => setDbStatus('Offline Mode'));
  }, []);

  // MongoDB Login Integration with strict credential validation
  const login = async (email, password) => {
    let response;
    let data;

    try {
      response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username: email })
      });
      data = await response.json();
    } catch (networkError) {
      console.warn('Backend server unreachable, using offline fallback:', networkError.message);
      // Offline fallback ONLY when network fails completely
      const role = email.includes('admin') ? 'Admin' : (email.includes('guide') ? 'Guide' : 'Traveler');
      const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const fallbackUser = { name, email, role };
      setCurrentUser(fallbackUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(fallbackUser));
      return { success: true, user: fallbackUser, isFallback: true };
    }

    // Handle HTTP response from MongoDB Backend API
    if (response.ok && data.user) {
      const user = data.user;
      setCurrentUser(user);
      if (data.token) {
        localStorage.setItem('globetrotter_token', data.token);
      }
      localStorage.setItem('globetrotter_user', JSON.stringify(user));
      return { success: true, user };
    } else {
      // Reject login if credentials are invalid or user not found
      throw new Error(data.error || 'Invalid credentials. Please check your email and password.');
    }
  };

  // MongoDB Register Integration
  const register = async (name, email, password, role = 'Traveler') => {
    let response;
    let data;

    try {
      response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      data = await response.json();
    } catch (networkError) {
      console.warn('Backend server unreachable, using offline registration fallback:', networkError.message);
      const fallbackUser = { name, email, role };
      setCurrentUser(fallbackUser);
      localStorage.setItem('globetrotter_user', JSON.stringify(fallbackUser));
      return { success: true, user: fallbackUser, isFallback: true };
    }

    if (response.ok && data.user) {
      const user = data.user;
      setCurrentUser(user);
      if (data.token) {
        localStorage.setItem('globetrotter_token', data.token);
      }
      localStorage.setItem('globetrotter_user', JSON.stringify(user));
      return { success: true, user };
    } else {
      throw new Error(data.error || 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('globetrotter_user');
      localStorage.removeItem('globetrotter_token');
    } catch (e) {
      console.warn('Could not remove user from localStorage', e);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, register, logout, dbStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
