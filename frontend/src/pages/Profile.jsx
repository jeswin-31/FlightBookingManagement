import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Load user profile
  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axiosInstance.get('/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        name: res.data.name || '',
        email: res.data.email || '',
        password: '' // never pre-fill password
      });
    } catch (err) {
      alert('Failed to load profile');
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(
        '/api/auth/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="New Password (optional)"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
