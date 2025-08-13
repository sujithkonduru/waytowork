import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/ClientDashboard.css';

const ClientDashboard = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [skillFilter, setSkillFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [feedbackData, setFeedbackData] = useState({}); // { bookingId: { rating: '', feedback: '' } }

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:8085/login/workers');
      setWorkers(response.data);
    } catch (error) {
      console.error('Failed to fetch workers:', error);
    }
  };

  const fetchBookings = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8085/booking/client/${clientId}`);
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    }
  }, [clientId]);

  useEffect(() => {
    fetchWorkers();
    fetchBookings();
  }, [fetchBookings]);

  const handleBooking = (workerId) => {
    navigate(`/booking/create/${clientId}/${workerId}`);
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`http://localhost:8085/booking/cancel/${bookingId}`);
        alert('Booking cancelled.');
        fetchBookings();
      } catch (err) {
        alert('Cancellation failed.');
      }
    }
  };

  const handleFeedbackChange = (bookingId, field, value) => {
    setFeedbackData((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [field]: value,
      },
    }));
  };

  const handleFeedbackSubmit = async (bookingId) => {
    const { rating, feedback } = feedbackData[bookingId] || {};
    if (!rating || !feedback) {
      alert("Please provide both rating and feedback.");
      return;
    }

    try {
      await axios.post(`http://localhost:8085/booking/feedback/${bookingId}`, {
        rating,
        feedback,
      });
      alert('Feedback submitted.');
      fetchBookings();
    } catch (error) {
      alert('Feedback submission failed.');
    }
  };

  const filteredWorkers = workers.filter((worker) =>
    skillFilter ? worker.skills?.toLowerCase().includes(skillFilter.toLowerCase()) : true
  );

  const filteredBookings = bookings.filter((booking) =>
    statusFilter ? booking.status === statusFilter : true
  );

  return (
    <div className="client-dashboard">
      <h2>Welcome to Client Dashboard</h2>

      {/* Filter bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Filter by skill"
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={() => { fetchWorkers(); fetchBookings(); }}>Refresh</button>
      </div>

      {/* Worker List */}
      <h3>Available Workers</h3>
      <div className="worker-list">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => (
            <div key={worker.workerId} className="worker-card">
              <h4>{worker.firstName} {worker.lastName}</h4>
              <p><strong>Skill:</strong> {worker.skills}</p>
              <p><strong>Wage:</strong> ₹{worker.wage}/day</p>
              <p><strong>Phone:</strong> {worker.phone}</p>
              <p><strong>Address:</strong> {worker.address}</p>
              <button onClick={() => handleBooking(worker.workerId)}>Book</button>
            </div>
          ))
        ) : (
          <p>No workers available.</p>
        )}
      </div>

      {/* Booking List */}
      <h3>Your Bookings</h3>
      <div className="booking-list">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <p>
                <strong>Worker:</strong> {booking.worker?.firstName} {booking.worker?.lastName}<br />
                <strong>Phone:</strong> {booking.worker?.phone}
              </p>
              <p><strong>Date:</strong> {booking.bookingDate}</p>
              <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
              <p><strong>Location:</strong> {booking.location}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              {booking.status !== 'Cancelled' && (
                <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>Cancel Booking</button>
              )}

              {/* Feedback Form */}
              <div className="feedback-form">
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="Rating (1-5)"
                  value={feedbackData[booking.id]?.rating || ''}
                  onChange={(e) => handleFeedbackChange(booking.id, 'rating', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Feedback"
                  value={feedbackData[booking.id]?.feedback || ''}
                  onChange={(e) => handleFeedbackChange(booking.id, 'feedback', e.target.value)}
                />
                <button onClick={() => handleFeedbackSubmit(booking.id)}>
                  Submit Feedback
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
