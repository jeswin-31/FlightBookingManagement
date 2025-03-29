import React, { useState } from 'react';
import axios from 'axios';

const PaymentCheckout = ({ userId, itemType, itemId, amount }) => {
  const [status, setStatus] = useState('');

  const handlePayment = async () => {
    try {
      const res = await axios.post('/api/payment/checkout', {
        userId,
        itemType,
        itemId,
        amount
      });

      if (res.data.success) setStatus('Payment Successful!');
      else setStatus('Payment Failed');
    } catch (err) {
      setStatus('Error during payment');
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Checkout</h3>
      <p>Total Amount: ${amount}</p>
      <button className="bg-green-600 text-white p-2 mt-2" onClick={handlePayment}>Pay Now</button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default PaymentCheckout;
