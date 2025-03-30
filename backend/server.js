const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

// ✅ INIT APP FIRST
const app = express();

// ✅ MIDDLEWARES
app.use(cors());
app.use(express.json());

// ✅ ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/flights', require('./routes/flightRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes')); // ✅ moved here, only once

// ✅ START SERVER (if not in test mode)
if (require.main === module) {
  connectDB();
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;
