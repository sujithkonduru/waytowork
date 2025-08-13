import React, { useState } from 'react';
import '../style/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [role, setRole] = useState('ROLE_CLIENT');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState('');
  const [wage, setWage] = useState('');
  const [password, setPassword] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      phone,
      address,
      email,
      password,
      skills: role === 'ROLE_WORKER' ? skills : '',
      wage: role === 'ROLE_WORKER' ? parseFloat(wage) : null,
      driveLink: role === 'ROLE_WORKER' ? driveLink : '',
      status: 'PENDING',
      role,
    };

    try {
      await axios.post('http://localhost:8085/login/register', payload, {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
      alert('Registration Successful');
      navigate(`/login`);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data || 'Registration failed.';
      alert(errorMsg);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-heading">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ROLE_CLIENT">Client</option>
            <option value="ROLE_WORKER">Worker</option>
          </select>

          <input
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            className="form-control"
            placeholder="Phone"
            type="tel"
            pattern="[0-9]{10}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            className="form-control"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {role === 'ROLE_WORKER' && (
            <>
              <input
                className="form-control"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                required
              />

              <input
                className="form-control"
                placeholder="Wage"
                type="number"
                min="0"
                value={wage}
                onChange={(e) => setWage(e.target.value)}
                required
              />

              <input
                className="form-control"
                placeholder="Drive Link (Google Drive)"
                value={driveLink}
                onChange={(e) => setDriveLink(e.target.value)}
                required
              />
            </>
          )}

          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="register-btn" type="submit">Register</button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
