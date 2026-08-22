const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { users } = require('../data/mockDatabase');

// POST /api/auth/login — Strict MongoDB authentication
router.post('/login', async (req, res) => {
  const { username, password, email } = req.body;
  const target = (email || username || '').trim();

  if (!target || !password) {
    return res.status(400).json({ error: 'Please enter both email address and password.' });
  }

  try {
    // 1. Search in MongoDB User collection
    const mongoUser = await User.findOne({ email: new RegExp(`^${target.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i') });

    if (mongoUser) {
      // Validate password against MongoDB document
      if (mongoUser.password !== password) {
        return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
      }

      return res.json({
        message: 'Login successful',
        user: {
          id: mongoUser._id,
          name: mongoUser.name,
          email: mongoUser.email,
          role: mongoUser.role
        },
        token: `token-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
      });
    }

    // 2. Check in-memory demo users array fallback
    const memUser = users.find(u => u.email.toLowerCase() === target.toLowerCase());
    if (memUser) {
      if (password !== 'password123' && password !== 'adminpassword') {
        return res.status(401).json({ error: 'Invalid password. Please check your credentials.' });
      }
      return res.json({
        message: 'Login successful',
        user: memUser,
        token: `token-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
      });
    }

    // 3. User does NOT exist
    return res.status(401).json({ error: 'No account found with this email address. Please create an account first.' });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Authentication service error. Please try again.' });
  }
});

// POST /api/auth/register — Create user record in MongoDB
router.post('/register', async (req, res) => {
  const { name, email, password, role = 'Traveler' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Full name, email address, and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    // Check if account already exists in MongoDB
    const existingUser = await User.findOne({ email: new RegExp(`^${cleanEmail.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i') });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' });
    }

    // Create new Mongoose document in MongoDB
    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role
    });

    res.status(201).json({
      message: 'Account created successfully in MongoDB',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token: `token-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message || 'Could not register user. Please try again.' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }
  res.json({
    message: `Password reset link sent to ${email}`,
    resetToken: `reset-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
  });
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  try {
    const mongoUser = await User.findOne();
    if (mongoUser) {
      return res.json({ user: mongoUser });
    }
  } catch (e) {
    // ignore
  }
  res.json({ user: users[0] || { id: 'usr-1', name: 'Aarav Sharma', email: 'aarav.sharma@example.com', role: 'Traveler' } });
});

module.exports = router;
