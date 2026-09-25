import React from "react";
import "./Admin.css";

function AdminNavbar({ active, setActive }) {
  return (
    <div className="admin-navbar">
      <button
        className={active === "users" ? "nav-btn active" : "nav-btn"}
        onClick={() => setActive("users")}
      >
        👤 Users
      </button>

      <button
        className={active === "internships" ? "nav-btn active" : "nav-btn"}
        onClick={() => setActive("internships")}
      >
        🎯 Internships
      </button>

      <button
        className={active === "applications" ? "nav-btn active" : "nav-btn"}
        onClick={() => setActive("applications")}
      >
        📋 Applications
      </button>

      <button
        className={`nav-btn ${active === "accepted" ? "active" : ""}`}
        onClick={() => setActive("accepted")}
        >
        ✅ Accepted Internships
      </button>

      <button
        className={`nav-btn ${active === "rejected" ? "active" : ""}`}
        onClick={() => setActive("rejected")}
      >
        ❌ Rejected Internships
      </button>


    </div>
  );
}

export default AdminNavbar;
