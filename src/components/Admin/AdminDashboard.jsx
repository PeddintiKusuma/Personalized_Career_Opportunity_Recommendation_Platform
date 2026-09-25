import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminUsers from "./AdminUsers";
import AdminApplications from "./AdminApplications";
import AdminInternships from "./AdminInternships";
import AdminAcceptedInternships from "./AdminAcceptedInternships";
import AdminRejectedInternships from "./AdminRejectedInternships";

import "./Admin.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <AdminNavbar active={activeTab} setActive={setActiveTab} />

      {/* MAIN VIEWPORT */}
      <main className="main-viewport">
        {/* TOP BAR / HEADER */}
        <header className="admin-header">
          <div className="header-info">
            <h1>Admin Management</h1>
            <p>Overview of users, internships, and student applications</p>
          </div>
          <div className="header-actions">
            <span className="admin-badge">System Admin</span>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="admin-content-area">
          {activeTab === "users" && <AdminUsers />}
          {activeTab === "internships" && <AdminInternships />}
          {activeTab === "applications" && <AdminApplications />}
          {activeTab === "accepted" && <AdminAcceptedInternships />}
          {activeTab === "rejected" && <AdminRejectedInternships />}
          

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;