import React, { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import "./Admin.css";

function AdminRejectedInternships() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRejectedApplications = async () => {
    try {
      const data = await apiGet("/admin/applications");

      // ✅ ONLY rejected
      const rejectedApps = Array.isArray(data)
        ? data.filter(app => app.status === "REJECTED")
        : [];

      setApps(rejectedApps);
    } catch (err) {
      console.error("Failed to load rejected applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRejectedApplications();
  }, []);

  // 🔹 Approve rejected
  const approve = async (id) => {
    await fetch(`http://localhost:8080/api/admin/applications/${id}/approve`, {
      method: "PUT",
    });

    // remove from rejected list after approve
    setApps(prev => prev.filter(app => app.applicationId !== id));
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">❌ Rejected Internship Applications</h2>

      {loading && <p>Loading rejected applications...</p>}

      {!loading && apps.length === 0 && (
        <p className="empty">No rejected applications</p>
      )}

      <div className="admin-grid">
        {apps.map(app => (
          <div key={app.applicationId} className="admin-app-card">

            <h3>{app.internshipTitle}</h3>

            <p><b>Company: </b> {app.company}</p>
            <p><b>Location: </b> {app.location}</p>
            <p><b>Duration: </b> {app.duration}</p>

            <hr />

            <p><b>User: </b> {app.userName}</p>
            <p><b>Email: </b> {app.userEmail}</p>

            <span className={`status-badge rejected`}>
              REJECTED
            </span>

            {/* SAME BUTTON STYLE */}
            <div className="admin-actions">
              <button
                className="approve"
                onClick={() => approve(app.applicationId)}
              >
                Do you want to accept?
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRejectedInternships;
