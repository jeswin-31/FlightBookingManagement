const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    default: null
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    default: null
  },
  seats: {
    type: Number,
    default: 1
  },
  seatNumbers: {
    type: [String], // <== Add this to store selected seat numbers
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
