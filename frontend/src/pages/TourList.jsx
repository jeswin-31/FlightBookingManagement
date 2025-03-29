import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    axios.get('/api/tours').then(res => setTours(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tours.map((tour) => (
          <div key={tour._id} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{tour.title}</h3>
            <p>{tour.location}</p>
            <p>From: {new Date(tour.startDate).toDateString()}</p>
            <p>To: {new Date(tour.endDate).toDateString()}</p>
            <p>Price: ${tour.price}</p>
            <p>Seats Left: {tour.availableSeats}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourList;
