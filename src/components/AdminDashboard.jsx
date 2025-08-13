import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/AdminDashboard.css'; // Make sure this CSS file exists


axios.defaults.withCredentials = true;
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the server
  const fetchUsers = () => {
    axios.get('http://localhost:8085/login/admin/users', { withCredentials: true })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch users:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = (userid) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios.delete(`http://localhost:8085/login/admin/delete/${userid}`, { withCredentials: true })
        .then(() => {
          alert('User deleted successfully');
          fetchUsers(); // Refresh user list
        })
        .catch((error) => {
          console.error('Failed to delete user:', error);
          alert('Failed to delete user');
        });
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <h4>All Registered Users</h4>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="6">No users found.</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
