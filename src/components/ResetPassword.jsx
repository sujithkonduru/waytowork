import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/ResetPassword.css'; // optional styling

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8085/reset-password', null, {
        params: { token, password },
      });

      if (response.data.includes("success")) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleReset} className="reset-password-form">
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>
      </form>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default ResetPassword;
