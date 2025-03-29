const express = require('express');
const router = express.Router();
const Transaction = require('./Transaction');

// Simulate payment processing
router.post('/checkout', async (req, res) => {
  const { userId, itemId, itemType, amount } = req.body;

  try {
    const transaction = new Transaction({
      userId,
      itemType,
      itemId,
      amount,
      status: 'Success'
    });
    await transaction.save();

    res.json({ success: true, message: 'Payment processed successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
