import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({});

  const loadTours = async () => {
    const res = await axios.get('/api/tours');
    setTours(res.data);
  };

  useEffect(() => {
    loadTours();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post('/api/tours', form);
    setForm({});
    loadTours();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/tours/${id}`);
    loadTours();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin: Manage Tours</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <input name="startDate" type="date" onChange={handleChange} />
      <input name="endDate" type="date" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="availableSeats" type="number" placeholder="Seats" onChange={handleChange} />
      <button className="bg-blue-500 text-white p-2" onClick={handleSubmit}>Add Tour</button>

      <ul className="mt-4">
        {tours.map((t) => (
          <li key={t._id} className="border p-2 my-1">
            {t.title} - {t.location} | ${t.price}
            <button className="bg-red-500 text-white ml-2 p-1" onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTours;
