import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8085/forgot-password', null, {
        params: { email },
      });

      if (response.data.token) {
        setMessage('Password reset link sent. Redirecting...');
        setTimeout(() => {
          navigate(`/reset-password?token=${response.data.token}`);
        }, 2000);
      } else {
        setError(response.data.error || 'Failed to send reset link');
      }
    } catch (err) {
      setError('Error sending reset link. Try again.');
      console.error(err);
    }
  };

  return (
    <div className='wrapper'>
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
    </div>
  );
};

export default ForgotPassword;
