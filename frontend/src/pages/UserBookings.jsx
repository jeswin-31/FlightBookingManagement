import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const token = localStorage.getItem('token');
    const res = await axiosInstance.get('/api/bookings/my', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBookings(res.data);
  };

  const handleCancel = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.delete(`/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message || 'Cancelled');
      loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Cancel failed');
      console.error('Cancel error:', err);
    }
  };
  

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 My Bookings</h2>
      <ul>
  {bookings
    .filter((b) => b !== null && b !== undefined) // Filter out null/undefined
    .map((b) => (
      <li key={b._id} className="border p-2 my-2">
        {b.type === 'flight' ? (
          <>
            ✈️ Flight: {b.flightNumber} — Airline: {b.airline} <br />
            🪑 Seats: {b.seats || 1} — Numbers: {b.seatNumbers?.join(', ') || 'N/A'}
          </>
        ) : b.type === 'tour' ? (
          <>
            🌍 Tour: {b.tourTitle}
          </>
        ) : (
          <>❓ Unknown Booking Type</>
        )}
        <button
          className="ml-4 bg-red-600 text-white px-2 py-1 rounded"
          onClick={() => handleCancel(b._id)}
        >
          Cancel
        </button>
      </li>
    ))}
</ul>


    </div>
  );
};

export default UserBookings;
