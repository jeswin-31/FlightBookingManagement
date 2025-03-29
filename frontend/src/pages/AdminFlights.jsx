import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({});

  const loadFlights = async () => {
    const res = await axios.get('/api/flights');
    setFlights(res.data);
  };

  useEffect(() => {
    loadFlights();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post('/api/flights', form);
    setForm({});
    loadFlights();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/flights/${id}`);
    loadFlights();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin: Manage Flights</h2>

      <input name="flightNumber" placeholder="Flight Number" onChange={handleChange} />
      <input name="airline" placeholder="Airline" onChange={handleChange} />
      <input name="source" placeholder="Source" onChange={handleChange} />
      <input name="destination" placeholder="Destination" onChange={handleChange} />
      <input name="departureTime" type="datetime-local" onChange={handleChange} />
      <input name="arrivalTime" type="datetime-local" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <input name="seatsAvailable" placeholder="Seats" type="number" onChange={handleChange} />
      <button className="bg-blue-500 text-white p-2" onClick={handleSubmit}>Add Flight</button>

      <ul className="mt-4">
        {flights.map((f) => (
          <li key={f._id} className="border p-2 my-1">
            {f.flightNumber} - {f.source} to {f.destination} | ${f.price}
            <button onClick={() => handleDelete(f._id)} className="bg-red-500 text-white ml-2 p-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFlights;
