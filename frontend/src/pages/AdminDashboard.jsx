import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/admin/flights')}
          className="bg-blue-600 text-white py-4 px-6 rounded hover:bg-blue-700"
        >
          ✈️ Manage Flights
        </button>

        <button
          onClick={() => navigate('/admin/tours')}
          className="bg-green-600 text-white py-4 px-6 rounded hover:bg-green-700"
        >
          🏞 Manage Tour Packages
        </button>

        <button
          onClick={() => navigate('/admin/users')}
          className="bg-purple-600 text-white py-4 px-6 rounded hover:bg-purple-700"
        >
          👥 Manage Users
        </button>

        <button
          onClick={() => navigate('/admin/transactions')}
          className="bg-yellow-600 text-white py-4 px-6 rounded hover:bg-yellow-700"
        >
          💰 View Transactions
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
