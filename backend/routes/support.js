const express = require('express');
const router = express.Router();
const SupportTicket = require('../models/SupportTicket');
const { supportTickets } = require('../data/mockDatabase');

const FAQS = [
  {
    question: 'How does GlobeTrotter Multi-Stop Booking work?',
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

// Live Support Chat Store
const CHAT_CONVERSATIONS = [
  {
    chatId: 'chat-usr-1',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@example.com',
    unreadAdminCount: 1,
    messages: [
      { id: 'm-1', sender: 'user', text: 'Hi! I have a question regarding my multi-stop booking GT-94821.', timestamp: '10:30 AM' },
      { id: 'm-2', sender: 'admin', text: 'Hello Aarav! Welcome to GlobeTrotter Concierge. How can I assist you with your Delhi-Dubai-Paris itinerary?', timestamp: '10:31 AM' },
      { id: 'm-3', sender: 'user', text: 'Can I request a late check-in for Pullman Paris Tour Eiffel hotel?', timestamp: '10:32 AM' },
      { id: 'm-4', sender: 'admin', text: 'Absolutely! I have added a note to your voucher for late arrival. You are all set!', timestamp: '10:33 AM' }
    ]
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

// GET /api/support/chat — Get active live chat threads
router.get('/chat', (req, res) => {
  res.json({ conversations: CHAT_CONVERSATIONS });
});

// POST /api/support/chat — Send message in chat thread
router.post('/chat', (req, res) => {
  const { chatId = 'chat-usr-1', sender = 'user', text, userName = 'Traveler', userEmail } = req.body;

  if (!text) return res.status(400).json({ error: 'Message text is required' });

  let thread = CHAT_CONVERSATIONS.find(c => c.chatId === chatId);
  if (!thread) {
    thread = {
      chatId,
      userName,
      userEmail: userEmail || `${userName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      unreadAdminCount: 0,
      messages: []
    };
    CHAT_CONVERSATIONS.unshift(thread);
  }

  const newMsg = {
    id: `m-${Date.now()}`,
    sender,
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  thread.messages.push(newMsg);

  // Auto AI agent response if sent by user and no human admin responds immediately
  if (sender === 'user') {
    thread.unreadAdminCount += 1;
    setTimeout(() => {
      let replyText = 'Thank you for reaching out! A GlobeTrotter travel concierge agent is reviewing your query.';
      const lower = text.toLowerCase();
      if (lower.includes('pnr') || lower.includes('booking') || lower.includes('status')) {
        replyText = 'Your booking is verified and active! You can view your scannable 1D barcode ticket and 2D hotel QR pass in your History page.';
      } else if (lower.includes('delay') || lower.includes('flight') || lower.includes('gate')) {
        replyText = 'All connecting flights on your itinerary are currently ON TIME. We monitor live flight delays automatically!';
      } else if (lower.includes('cab') || lower.includes('driver') || lower.includes('taxi')) {
        replyText = 'Your chauffeur has been dispatched! Please present your pick-up QR code upon arrival at the terminal.';
      } else if (lower.includes('train') || lower.includes('pnr') || lower.includes('berth')) {
        replyText = 'Your IRCTC train seat is confirmed! Coach details and seat numbers are printed on your E-Ticket voucher.';
      }
      thread.messages.push({
        id: `m-${Date.now() + 1}`,
        sender: 'admin',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1200);
  }

  res.status(201).json({ message: 'Message sent', thread, newMessage: newMsg });
});

module.exports = router;
