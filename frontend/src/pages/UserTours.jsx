import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const UserTours = () => {
  const [tours, setTours] = useState([]);

  const loadTours = async () => {
    const res = await axiosInstance.get('/api/tours');
    setTours(res.data);
  };

  const handleBook = async (tourId) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.post('/api/bookings/tour', { tourId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Tour booked successfully!');
    } catch (err) {
      alert('Booking failed');
    }
  };

  useEffect(() => {
    loadTours();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🌍 Tour Packages</h2>
      <ul>
        {tours.map(t => (
          <li key={t._id} className="border p-2 my-2">
            <strong>{t.title}</strong> — {t.location} | ${t.price}
            <button className="ml-4 bg-green-600 text-white px-2 py-1 rounded" onClick={() => handleBook(t._id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTours;
