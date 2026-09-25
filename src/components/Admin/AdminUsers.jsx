import React, { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

import "./Admin.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
   apiGet("/admin/users")
  .then(setUsers)
  .catch(console.error);

  }, []);

  return (
    <div className="users-page">
      <h1 className="page-title">👥 Registered Users</h1>
      <p className="page-subtitle">
        View all students and administrators registered in the system
      </p>

      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h3>{user.name}</h3>
            <p className="user-email">{user.email}</p>

            <span
              className={`role-badge ${
                user.role === "ADMIN" ? "admin" : "student"
              }`}
            >
              {user.role}
            </span>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <p className="empty-text">No users found</p>
      )}
    </div>
  );
}

export default AdminUsers;
