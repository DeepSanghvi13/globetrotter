const mongoose = require('mongoose');

const TrainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true },
  from: mongoose.Schema.Types.Mixed,
  to: mongoose.Schema.Types.Mixed,
  depTime: String,
  arrTime: String,
  duration: String,
  speed: String,
  classes: [mongoose.Schema.Types.Mixed],
  rating: Number,
  punctuality: String
});

module.exports = mongoose.model('Train', TrainSchema);
