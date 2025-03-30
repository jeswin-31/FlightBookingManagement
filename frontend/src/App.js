import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import UserFlights from './pages/UserFlights';
import UserTours from './pages/UserTours';
import UserBookings from './pages/UserBookings';
import AdminUsers from './pages/AdminUsers';
import AdminFlights from './pages/AdminFlights';
import AdminTours from './pages/AdminTours';
import AdminTransactions from './pages/AdminTransactions';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<Tasks />} />

        {/* User routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/flights" element={<UserFlights />} />
        <Route path="/user/tours" element={<UserTours />} />
        <Route path="/user/bookings" element={<UserBookings />} />

        {/* Admin routes */}
        <Route path="/admin/users" element={<PrivateRoute allowedRoles={['admin']}><AdminUsers /></PrivateRoute>} />
        <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/flights" element={<PrivateRoute allowedRoles={['admin']}><AdminFlights /></PrivateRoute>} />
        <Route path="/admin/tours" element={<PrivateRoute allowedRoles={['admin']}><AdminTours /></PrivateRoute>} />
        <Route path="/admin/transactions" element={<PrivateRoute allowedRoles={['admin']}><AdminTransactions /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
