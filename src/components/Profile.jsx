// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [profile, setProfile] = useState({
    id: '',
    phone: '',
    address: '',
    skills: '',
    wage: '',
    roles: []
  });

  useEffect(() => {
    axios.get(`http://localhost:8085/profile/${userId}`)
      .then(res => setProfile(res.data))
      .catch(err => alert("Failed to load profile"));
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8085/profile/update`, profile)
      .then(res => alert("Profile updated successfully"))
      .catch(err => alert("Update failed"));
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <label>Phone:</label>
      <input name="phone" value={profile.phone} onChange={handleChange} />

      <label>Address:</label>
      <input name="address" value={profile.address} onChange={handleChange} />

      {profile.roles.includes('ROLE_WORKER') && (
        <>
          <label>Skills:</label>
          <input name="skills" value={profile.skills || ''} onChange={handleChange} />

          <label>Wage (₹):</label>
          <input name="wage" type="number" value={profile.wage || ''} onChange={handleChange} />
        </>
      )}

      <button type="submit">Update</button>
    </form>
  );
};

export default Profile;
