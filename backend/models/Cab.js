const mongoose = require('mongoose');

const CabSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  seats: Number,
  bags: String,
  basePrice: Number,
  rating: Number,
  image: String,
  features: [String]
});

module.exports = mongoose.model('Cab', CabSchema);
