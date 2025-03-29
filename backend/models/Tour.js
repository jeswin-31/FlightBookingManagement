const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);
