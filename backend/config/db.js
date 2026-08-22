const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/globetrotter';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`🍃 MongoDB Connected Successfully: ${conn.connection.host} / database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Status: Disconnected (${error.message}). Running with resilience layer.`);
    return false;
  }
};

const getDBStatus = () => {
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const readyState = mongoose.connection.readyState;
  return {
    isConnected: readyState === 1,
    readyState,
    status: stateMap[readyState] || 'unknown',
    host: mongoose.connection.host || 'Not Connected',
    name: mongoose.connection.name || 'globetrotter',
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/globetrotter'
  };
};

module.exports = { connectDB, getDBStatus };
