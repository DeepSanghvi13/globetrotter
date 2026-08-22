const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  pnr: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Confirmed E-Ticket'
  },
  departureDate: {
    type: String,
    default: '2026-09-15'
  },
  travelers: {
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    cabinClass: { type: String, default: 'Economy' }
  },
  primaryPassenger: {
    type: String,
    default: 'Aarav Sharma'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  stops: [mongoose.Schema.Types.Mixed],
  selectedHotels: mongoose.Schema.Types.Mixed,
  selectedActivities: [mongoose.Schema.Types.Mixed],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
