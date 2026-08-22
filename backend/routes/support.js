const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const { supportTickets } = require('../data/mockDatabase');

const FAQS = [
  {
    question: 'How does MakeMyTrip Multi-Stop Booking work?',
    answer: 'GlobeTrotter allows you to add up to 6 connecting city legs in one single search. You can select layover nights per stop, customize stopover hotels, add curated sightseeing passes, and download a single unified barcode itinerary.'
  },
  {
    question: 'Can I add different travel modes (Flight, Train, Cab) for different legs?',
    answer: 'Yes! Every leg on your multi-city route can be customized individually to be a Flight, Train, or Cab transfer.'
  },
  {
    question: 'Where can I find my hotel check-in QR codes and flight ticket barcodes?',
    answer: 'Your scannable 1D flight barcodes and 2D hotel check-in QR codes are automatically generated inside your E-Ticket voucher modal and stored in your History page.'
  }
];

// GET /api/support/faqs
router.get('/faqs', (req, res) => {
  res.json({ faqs: FAQS });
});

// GET /api/support/tickets
router.get('/tickets', async (req, res) => {
  try {
    const dbTickets = await SupportTicket.find().sort({ createdAt: -1 });
    if (dbTickets && dbTickets.length > 0) {
      return res.json({ tickets: dbTickets });
    }
  } catch (err) {
    // Fallback
  }
  res.json({ tickets: supportTickets });
});

// POST /api/support/tickets — Submit a support ticket
router.post('/tickets', async (req, res) => {
  const { name, email, pnr, category = 'General', priority = 'Normal', message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const ticketId = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;

  try {
    const createdTicket = await SupportTicket.create({
      ticketId,
      name,
      email,
      pnr,
      category,
      priority,
      message,
      status: 'Received'
    });

    supportTickets.unshift(createdTicket);

    res.status(201).json({
      message: 'Support ticket created successfully in MongoDB',
      ticketId,
      ticket: createdTicket
    });
  } catch (err) {
    const fallbackTicket = { ticketId, name, email, pnr, category, priority, message, status: 'Received', createdAt: new Date().toLocaleDateString('en-US') };
    supportTickets.unshift(fallbackTicket);
    res.status(201).json({
      message: 'Support ticket submitted successfully',
      ticketId,
      ticket: fallbackTicket
    });
  }
});

module.exports = router;
