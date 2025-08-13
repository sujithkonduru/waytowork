import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/BookWorker.css';

const BookWorker = () => {
  const { workerId, clientId } = useParams();
  const navigate = useNavigate();

  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/workers/${workerId}`);
        setWorker(response.data);
      } catch (error) {
        console.error('Failed to fetch worker:', error);
      }
    };

    fetchWorker();
  }, [workerId]);

  const handleBooking = async () => {
    if (!bookingDate || !timeSlot.trim() || !location.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const bookingRequest = {
      workerId: Number(workerId),
      bookingDate,
      timeSlot,
      location,
      notes: notes.trim()
    };

    try {
      await axios.post(
        `http://localhost:8085/booking/create/${clientId}`,
        bookingRequest
      );
      alert('Booking successful!');
      navigate(`/client/dashboard/${clientId}`);
    } catch (error) {
      console.error('Booking failed:', error);
      const errorMsg = error?.response?.data || 'Something went wrong.';
      alert(`Booking failed: ${errorMsg}`);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Book Worker {worker ? `#${worker.firstName} ${worker.lastName || ''}` : ''}</h2>

      <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label className="required">Date <span style={{ color: 'red' }}>*</span></label>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Time Slot <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            placeholder="e.g., 9AM - 6PM"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Location <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            placeholder="e.g., Hyderabad"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Notes (optional)</label>
          <textarea
            placeholder="e.g., bring cleaning supplies..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleBooking}>
          Book Worker
        </button>
      </form>
    </div>
  );
};

export default BookWorker;
