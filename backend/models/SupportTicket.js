const mongoose = require('mongoose');

const SupportTicketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  pnr: String,
  category: { type: String, default: 'General' },
  priority: { type: String, default: 'Normal' },
  message: { type: String, required: true },
  status: { type: String, default: 'Received' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SupportTicket', SupportTicketSchema);
