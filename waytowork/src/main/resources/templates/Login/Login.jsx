import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../style/Login.css'; // ✅ Corrected import path
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
      params.append('role', role);

      const response = await axios.post('http://localhost:8085/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true
      });

      if (response.status === 200) {
        if (role === 'ROLE_WORKER') {
          navigate('/worker/dashboard');
        } else if (role === 'ROLE_CLIENT') {
          navigate('/client/dashboard');
        } else if (role === 'ROLE_ADMIN') {
          navigate('/admin/dashboard');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials or server error. Please try again.');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">
          <i className="fas fa-sign-in-alt"></i> Login to Way to Work
        </h3>

        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger text-center">{error}</div>}

          <div className="mb-3">
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="ROLE_WORKER">Worker</option>
              <option value="ROLE_CLIENT">Client</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="fas fa-unlock-alt me-2"></i> Login
          </button>

          <div className="mt-3 text-center">
            <a href="/forgot-password">Forgot Password?</a> |{' '}
            <a href="/register">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
