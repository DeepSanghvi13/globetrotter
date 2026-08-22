require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getDBStatus } = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const bookingRoutes = require('./routes/bookings');
const trainRoutes = require('./routes/trains');
const cabRoutes = require('./routes/cabs');
const supportRoutes = require('./routes/support');
const adminRoutes = require('./routes/admin');

// Mongoose Models for live counts
const User = require('./models/User');
const Booking = require('./models/Booking');
const Train = require('./models/Train');
const Cab = require('./models/Cab');
const SupportTicket = require('./models/SupportTicket');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root & Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'online',
    service: 'GlobeTrotter Backend REST API Engine',
    version: '2.0.0',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Dedicated Database Connection & Collections Status Endpoint
app.get('/api/db-status', async (req, res) => {
  const dbStatus = getDBStatus();

  let counts = { users: 0, bookings: 0, trains: 0, cabs: 0, supportTickets: 0 };
  if (dbStatus.isConnected) {
    try {
      counts.users = await User.countDocuments({});
      counts.bookings = await Booking.countDocuments({});
      counts.trains = await Train.countDocuments({});
      counts.cabs = await Cab.countDocuments({});
      counts.supportTickets = await SupportTicket.countDocuments({});
    } catch (err) {
      console.error('Document count error:', err);
    }
  }

  res.json({
    connected: dbStatus.isConnected,
    status: dbStatus.status,
    connectionHost: dbStatus.host,
    databaseName: dbStatus.name,
    uri: dbStatus.uri,
    collections: ['users', 'bookings', 'trains', 'cabs', 'supporttickets'],
    recordCounts: counts,
    message: dbStatus.isConnected
      ? '🍃 MongoDB is CONNECTED and storing all platform data!'
      : '⚠️ MongoDB is DISCONNECTED (Server operating with hybrid fallback store)'
  });
});

app.get('/', (req, res) => {
  const dbStatus = getDBStatus();
  res.send(`
    <div style="font-family: sans-serif; padding: 2rem; background-color: #FBF8F4; color: #1C1917; line-height: 1.6;">
      <h1 style="color: #C1440E;">🌐 GlobeTrotter Backend REST API Server</h1>
      <div style="background-color: ${dbStatus.isConnected ? '#DCFCE7' : '#FEF3C7'}; border: 1px solid ${dbStatus.isConnected ? '#86EFAC' : '#FDE68A'}; color: ${dbStatus.isConnected ? '#166534' : '#92400E'}; padding: 0.85rem 1.25rem; borderRadius: 10px; font-weight: 700; margin-bottom: 1.5rem;">
        Database Status: ${dbStatus.isConnected ? '🍃 MongoDB CONNECTED (' + dbStatus.host + ' / ' + dbStatus.name + ')' : '⚠️ MongoDB DISCONNECTED (Hybrid Fallback Store Active)'}
      </div>
      <p>Official backend API server for GlobeTrotter Multi-Stop Flight, Train & Cab Booking Platform.</p>
      <ul>
        <li><strong>Database Status Check:</strong> <a href="/api/db-status">/api/db-status</a></li>
        <li><strong>Health Check:</strong> <a href="/api/health">/api/health</a></li>
        <li><strong>Auth API:</strong> <code>POST /api/auth/login</code> | <code>POST /api/auth/register</code></li>
        <li><strong>Multi-Stop Search:</strong> <code>GET /api/search/cities</code> | <code>POST /api/search/multi-stop</code></li>
        <li><strong>Bookings & E-Tickets:</strong> <code>GET /api/bookings</code> | <code>POST /api/bookings</code></li>
        <li><strong>Trains API:</strong> <code>POST /api/trains/search</code> | <code>POST /api/trains/book</code></li>
        <li><strong>Cabs API:</strong> <code>POST /api/cabs/search</code> | <code>POST /api/cabs/book</code></li>
        <li><strong>Support & Tickets:</strong> <code>GET /api/support/faqs</code> | <code>POST /api/support/tickets</code></li>
        <li><strong>Admin Analytics:</strong> <code>GET /api/admin/stats</code></li>
      </ul>
    </div>
  `);
});

// API Routes Registration
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/cabs', cabRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/admin', adminRoutes);

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start Server after connecting to MongoDB
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 GlobeTrotter Express Backend running on http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });
};

startServer();
