import React, { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function AdminAcceptedInternships() {
  const [acceptedApps, setAcceptedApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccepted();
  }, []);

  const loadAccepted = async () => {
    try {
      const data = await apiGet("/admin/applications");

      // 🔹 Filter only ACCEPTED
      const accepted = data.filter(
        app => app.status === "ACCEPTED"
      );

      setAcceptedApps(accepted);
    } catch (err) {
      console.error("Failed to load accepted internships", err);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

      <button
            className="nav-btn"
            onClick={() => navigate("/admin/accepted")}
          >
            ✅ Accepted Internships
      </button>

  return (
    <div className="admin-page">
      <h2 className="admin-title">✅ Accepted Internships</h2>

      {loading && <p>Loading...</p>}

      {!loading && acceptedApps.length === 0 && (
        <p className="empty">No accepted internships yet</p>
      )}

      <div className="admin-grid">
        {acceptedApps.map(app => (
          <div key={app.applicationId} className="admin-app-card">

            <h3>{app.internshipTitle}</h3>

            <p><b>Company:</b> {app.company}</p>
            <p><b>Location:</b> {app.location}</p>
            <p><b>Duration:</b> {app.duration}</p>

            <hr />

            <p><b>Student:</b> {app.userName}</p>
            <p><b>Email:</b> {app.userEmail}</p>

            <span className="status-badge accepted">
              ACCEPTED
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminAcceptedInternships;
