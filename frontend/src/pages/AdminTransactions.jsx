import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/api/transactions').then(res => setTransactions(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Transaction History</h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx.userId}</td>
              <td>{tx.itemType}</td>
              <td>${tx.amount}</td>
              <td>{tx.status}</td>
              <td>{new Date(tx.timestamp).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactions;
