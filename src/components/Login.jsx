import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('CLIENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = `/login/${role.toLowerCase()}`;

    try {
      const response = await axios.post(`http://localhost:8085${endpoint}`, {
        email,
        password,
      });

      const data = response.data;
      const token = data.token || null;

      if (token) {
        localStorage.setItem('jwt', token);
      }

      localStorage.setItem("user", JSON.stringify(data));

      if (role === 'CLIENT') {
        const clientId = data.clientId || data.user?.id;
        navigate(`/client/dashboard/${clientId}`);
      } else if (role === 'WORKER') {
        const workerId = data.workerId || data.user?.id;
        navigate(`/worker/dashboard/${workerId}`);
      } else if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page-split">
      <div className="login-left">
        <div className="login-box">
          <h2 className="title">Way to Work</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="CLIENT">Client</option>
              <option value="WORKER">Worker</option>
              <option value="ADMIN">Admin</option>
            </select>

            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Login</button>

            <div className="links">
              <Link to="/forgot-password">Forgot Password?</Link>
              <Link to="/">Back to Home</Link>
            </div>
          </form>
        </div>
      </div>

      <div className="login-right">
        <div className="led-background">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="led"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
