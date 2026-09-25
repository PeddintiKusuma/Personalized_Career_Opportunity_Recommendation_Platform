import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-page">
      <div className="admin-title-section">
        <h2 className="admin-title">👥 Registered Users</h2>
        <p className="admin-subtitle">View and manage all students and administrators</p>
      </div>

      <div className="users-table-container">
        {/* Professional Table Header */}
        <div className="table-header">
          <span>Name & ID</span>
          <span>Email Address</span>
          <span>Account Role</span>
          <span>Action</span>
        </div>

        {/* User Rows */}
        {users.map((u) => (
          <div key={u.id} className="user-row">
            <div className="user-info-cell">
              <div className="user-avatar-small">
                {u.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="user-name-bold">{u.name}</div>
                <div className="user-id-tag">ID: #{u.id}</div>
              </div>
            </div>

            <div className="user-email-cell">{u.email}</div>

            <div>
              <span className={`role-pill ${u.role.toLowerCase()}`}>
                {u.role}
              </span>
            </div>

            <div>
              <button className="view-details-btn">View Profile</button>
            </div>
          </div>
        ))}

        {users.length === 0 && <p className="empty-msg">No users found in the system.</p>}
      </div>
    </div>
  );
}

export default UsersList;