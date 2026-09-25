import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import "./UserDashboard.css";

export default function UserAppliedInternships() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadApplied();
  }, []);

  const loadApplied = async () => {
    try {
      const data = await apiGet(`/applications/user/${userId}`);
      setApplications(data);
    } catch (err) {
      console.error("Failed to load applied internships", err);
    } finally {
      setLoading(false);
    }
  };

  const getDisplayStatus = (status) => {
    if (status === "APPLIED") return "PENDING";
    return status;
  };
  

  return (
    <div>
      <h2>📌 Applied Internships</h2>

      {loading && <p>Loading...</p>}

      {!loading && applications.length === 0 && (
        <p>You haven’t applied to any internships yet</p>
      )}

      <div className="grid">
        {applications.map(app => (
          <div key={app.applicationId} className="internship-card">
            <h3>{app.title}</h3>

            <p><b>Company:</b> {app.company}</p>
            <p><b>Location:</b> {app.location}</p>
            <p><b>Duration:</b> {app.duration}</p>

            <span
              className={`status-badge ${getDisplayStatus(app.status).toLowerCase()}`}
            >
              {getDisplayStatus(app.status)}
            </span>
            {app.status === "REJECTED" && app.rejectionReason && (
  <div className="rejection-box">
    <b>Reason:</b> {app.rejectionReason}
  </div>
)}
          </div>
        ))}
      </div>
    </div>
  );
}
