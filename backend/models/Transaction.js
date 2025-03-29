const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  itemType: String, // 'flight' or 'tour'
  itemId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  status: { type: String, enum: ['Success', 'Failed'], default: 'Success' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);

