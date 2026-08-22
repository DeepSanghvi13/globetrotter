const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { bookings } = require('../data/mockDatabase');

// GET /api/bookings — List user's bookings
router.get('/', async (req, res) => {
  const { status } = req.query;

  try {
    let query = {};
    if (status && status !== 'all') {
      query.status = new RegExp(status, 'i');
    }
    const dbBookings = await Booking.find(query).sort({ createdAt: -1 });
    if (dbBookings && dbBookings.length > 0) {
      return res.json({ bookings: dbBookings });
    }
  } catch (err) {
    // Fallback
  }

  if (status && status !== 'all') {
    const filtered = bookings.filter(b => b.status.toLowerCase().includes(status.toLowerCase()));
    return res.json({ bookings: filtered });
  }
  res.json({ bookings });
});

// GET /api/bookings/:id — Get specific booking voucher details
router.get('/:id', async (req, res) => {
  try {
    const dbBooking = await Booking.findOne({ $or: [{ _id: req.params.id }, { pnr: req.params.id }] });
    if (dbBooking) {
      return res.json({ booking: dbBooking });
    }
  } catch (err) {
    // Fallback
  }

  const booking = bookings.find(b => b.id === req.params.id || b.pnr === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking voucher not found' });
  }
  res.json({ booking });
});

// POST /api/bookings — Create a new multi-stop / flight booking
router.post('/', async (req, res) => {
  const { stops, totalPrice, primaryPassenger = 'Aarav Sharma', cabinClass = 'Economy' } = req.body;

  if (!stops || stops.length === 0) {
    return res.status(400).json({ error: 'Trip stops are required for booking creation.' });
  }

  const pnr = `MMT-GT-${Math.floor(10000 + Math.random() * 90000)}`;
  const title = `${stops[0]?.fromCity?.name || 'City'} ➔ ${stops.map(s => s.toCity?.name || 'Stop').join(' ➔ ')} Multi-City Tour`;

  const newBookingPayload = {
    pnr,
    title,
    status: 'Confirmed E-Ticket',
    departureDate: stops[0]?.departureDate || '2026-09-15',
    travelers: { adults: 1, children: 0, cabinClass },
    primaryPassenger,
    totalPrice: totalPrice || 145000,
    currency: 'INR',
    stops
  };

  try {
    const createdDoc = await Booking.create(newBookingPayload);
    bookings.unshift(createdDoc);
    return res.status(201).json({
      message: 'Booking created successfully in MongoDB',
      pnr,
      booking: createdDoc
    });
  } catch (err) {
    // Fallback
    const fallbackBooking = { id: `bk-${Date.now()}`, ...newBookingPayload, createdAt: new Date().toLocaleDateString('en-US') };
    bookings.unshift(fallbackBooking);
    res.status(201).json({
      message: 'Booking created successfully',
      pnr,
      booking: fallbackBooking
    });
  }
});

// DELETE /api/bookings/:id — Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const doc = await Booking.findOne({ $or: [{ _id: req.params.id }, { pnr: req.params.id }] });
    if (doc) {
      doc.status = 'Cancelled & Refunded';
      await doc.save();
      return res.json({
        message: 'Booking cancelled successfully in MongoDB',
        refundAmount: Math.round(doc.totalPrice * 0.9),
        cancelledBooking: doc
      });
    }
  } catch (err) {
    // Fallback
  }

  const index = bookings.findIndex(b => b.id === req.params.id || b.pnr === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  const cancelled = bookings[index];
  cancelled.status = 'Cancelled & Refunded';
  res.json({
    message: 'Booking cancelled successfully',
    refundAmount: Math.round(cancelled.totalPrice * 0.9),
    cancelledBooking: cancelled
  });
});

module.exports = router;
