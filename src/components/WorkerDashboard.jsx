import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style/WorkerDashboard.css';

const WorkerDashboard = () => {
  const { workerId } = useParams();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [summary, setSummary] = useState({ total: 0, confirmed: 0, cancelled: 0, averageRating: 0 });

  const [worker, setWorker] = useState({
    id: workerId,
    firstName: '', lastName: '', email: '',
    address: '', phone: '', skill: '', // ✅ use `skill` instead of `skills`
    wage: '', driveLink: '', profileImage: ''
  });

  const [message, setMessage] = useState('');

  const calculateSummary = (data) => {
    const total = data.length;
    const confirmed = data.filter(b => b.status === 'Confirmed').length;
    const cancelled = data.filter(b => b.status === 'Cancelled').length;
    const ratings = data.map(b => b.rating).filter(r => r != null);
    const averageRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 'N/A';
    setSummary({ total, confirmed, cancelled, averageRating });
  };

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8085/booking/worker/${workerId}`);
      setBookings(res.data);
      calculateSummary(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  }, [workerId]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:8085/profile/${workerId}`);
      setWorker(res.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  }, [workerId]);

  useEffect(() => {
    if (activeTab === 'dashboard') fetchBookings();
    if (activeTab === 'profile') fetchProfile();
  }, [activeTab, fetchBookings, fetchProfile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setWorker((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8085/profile/update`, worker);
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Profile update failed:', err);
      setMessage('Failed to update profile.');
    }
  };

  const filteredBookings = bookings.filter(b => (statusFilter ? b.status === statusFilter : true));

  return (
    <div className="worker-dashboard">
      <h2>Welcome to Worker Dashboard</h2>

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>
          Dashboard
        </button>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>
          My Profile
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <>
          <div className="summary">
            <p><strong>Total Bookings:</strong> {summary.total}</p>
            <p><strong>Confirmed:</strong> {summary.confirmed}</p>
            <p><strong>Cancelled:</strong> {summary.cancelled}</p>
            <p><strong>Average Rating:</strong> {summary.averageRating}</p>
          </div>

          <div className="filter-bar">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button onClick={fetchBookings}>Refresh</button>
          </div>

          <h3>Your Bookings</h3>
          <div className="booking-list">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.bookingId} className="booking-card">
                  <div className="booking-header">
                    <div className="client-avatar">
                      <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="client-details">
                      <h4>{booking.clientName || 'Client Name'}</h4>
                      <p><strong>📞</strong> {booking.phone || 'Phone number not available'}</p>
                    </div>
                    <span className={`status-badge ${booking.status.toLowerCase()}`}>{booking.status}</span>
                  </div>

                  <div className="booking-body">
                    <p><strong>📅 Date:</strong> {booking.bookingDate}</p>
                    <p><strong>⏰ Time Slot:</strong> {booking.timeSlot}</p>
                    <p><strong>📍 Location:</strong> {booking.location}</p>
                    {booking.rating && <p><strong>⭐ Rating:</strong> {booking.rating} / 5</p>}
                    {booking.feedback && <p><strong>📝 Feedback:</strong> {booking.feedback}</p>}
                  </div>
                </div>
              ))
            ) : (
              <p>No bookings available.</p>
            )}
          </div>
        </>
      )}

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className="profile-section">
          <h3>Update Profile</h3>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleProfileSubmit} className="profile-form">
            <input name="firstName" value={worker.firstName} onChange={handleProfileChange} placeholder="First Name" />
            <input name="lastName" value={worker.lastName} onChange={handleProfileChange} placeholder="Last Name" />
            <input name="email" value={worker.email} disabled />
            <input name="address" value={worker.address} onChange={handleProfileChange} placeholder="Address" />
            <input name="phone" value={worker.phone} onChange={handleProfileChange} placeholder="Phone" />
            <input name="skill" value={worker.skill || ''} onChange={handleProfileChange} placeholder="Skill" />
            <input name="wage" type="number" value={worker.wage || ''} onChange={handleProfileChange} placeholder="Wage" />
            <input name="driveLink" value={worker.driveLink} onChange={handleProfileChange} placeholder="Drive Link" />
            <button type="submit">update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
