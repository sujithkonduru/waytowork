import React, { useState } from 'react';

const FeedbackForm = ({ bookingId }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted feedback:', feedback);
    // Implement POST request logic here
  };

  return (
    <div className="container mt-4">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Feedback</label>
          <textarea className="form-control" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
