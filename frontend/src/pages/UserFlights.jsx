import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const UserFlights = () => {
  const [flights, setFlights] = useState([]);
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState({});

  const loadFlights = async () => {
    try {
      const res = await axiosInstance.get('/api/flights');
      setFlights(res.data);
    } catch (err) {
      alert('Failed to load flights');
    }
  };

  const handleSeatNumberChange = (flightId, value) => {
    const selected = Array.from(value.selectedOptions, (opt) => opt.value);
    setSelectedSeatNumbers({ ...selectedSeatNumbers, [flightId]: selected });
  };

  const handleBook = async (flightId) => {
    const seatNumbers = selectedSeatNumbers[flightId] || [];
    const token = localStorage.getItem('token');

    if (seatNumbers.length === 0) {
      return alert('Please select at least one seat');
    }

    try {
      await axiosInstance.post(
        '/api/bookings/flight',
        { flightId, seats: seatNumbers.length, seatNumbers },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert(`Booked seat(s): ${seatNumbers.join(', ')}`);
      loadFlights();
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  useEffect(() => {
    loadFlights();
  }, []);

  // Helper: Generate dummy seat map like 1A, 1B, ..., 6F
  const generateSeatMap = (count) => {
    const seats = [];
    const rows = Math.ceil(count / 6);
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r <= rows; r++) {
      for (let c of cols) {
        if (seats.length < count) seats.push(`${r}${c}`);
      }
    }
    return seats;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">✈️ Available Flights</h2>
      <ul>
        {flights.map((flight) => {
          const seatMap = generateSeatMap(flight.seatsAvailable);

          return (
            <li key={flight._id} className="border p-3 mb-4 rounded shadow">
              <div>
                <strong>{flight.flightNumber}</strong> — {flight.source} to {flight.destination} @ ${flight.price}
              </div>
              <div className="text-sm text-gray-600">
                🛫 Airline: {flight.airline} | 🪑 Seats Available: {flight.seatsAvailable}
              </div>

              <div className="mt-2">
              <div className="mt-4 max-h-60 overflow-y-auto border p-2 rounded">
  {Array.from({ length: Math.ceil(seatMap.length / 6) }).map((_, rowIndex) => (
    <div key={rowIndex} className="flex gap-2 justify-center mb-1">
      {seatMap
        .slice(rowIndex * 6, rowIndex * 6 + 6)
        .map((seat) => {
          const isSelected = (selectedSeatNumbers[flight._id] || []).includes(seat);
          return (
            <button
              key={seat}
              onClick={() => {
                const current = selectedSeatNumbers[flight._id] || [];
                const updated = isSelected
                  ? current.filter((s) => s !== seat)
                  : [...current, seat];
                setSelectedSeatNumbers({ ...selectedSeatNumbers, [flight._id]: updated });
              }}
              className={`w-10 h-10 border rounded ${
                isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {seat}
            </button>
          );
        })}
    </div>
  ))}
</div>


</div>


              <button
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
                onClick={() => handleBook(flight._id)}
              >
                Book
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserFlights;
