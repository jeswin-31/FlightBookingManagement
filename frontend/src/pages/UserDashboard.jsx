import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => navigate('/user/flights')} className="bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600">
          ✈️ Search Flights
        </button>
        <button onClick={() => navigate('/user/tours')} className="bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600">
          🏞 Browse Tour Packages
        </button>
        <button onClick={() => navigate('/user/bookings')} className="bg-purple-500 text-white py-3 px-4 rounded hover:bg-purple-600">
          🎫 My Bookings
        </button>
        <button onClick={() => navigate('/profile')} className="bg-gray-500 text-white py-3 px-4 rounded hover:bg-gray-600">
          👤 My Profile
        </button>
        <button onClick={() => navigate('/checkout')} className="bg-yellow-500 text-white py-3 px-4 rounded hover:bg-yellow-600 col-span-full">
          💳 Payment / Checkout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
