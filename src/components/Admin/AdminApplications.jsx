import React, { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import "./Admin.css";

function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load all applications
  const loadApplications = async () => {
    try {
      const data = await apiGet("/admin/applications");
      setApps(data);
    } catch (err) {
      console.error("Failed to load applications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // 🔹 Approve
  const approve = async (id) => {
    await fetch(`http://localhost:8080/api/admin/applications/${id}/approve`, {
      method: "PUT",
    });

    // ✅ update UI instantly
    setApps(prev =>
      prev.map(app =>
        app.applicationId === id
          ? { ...app, status: "ACCEPTED" }
          : app
      )
    );
  };

  // 🔹 Reject
 const reject = async (id) => {
  const reason = prompt("Enter rejection reason:");

  if (!reason) {
    alert("Rejection reason is required");
    return;
  }

 await fetch(
  `http://localhost:8080/api/applications/reject/${id}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: reason,
  }
);


  setApps(prev =>
    prev.map(app =>
      app.applicationId === id
        ? { ...app, status: "REJECTED", rejectionReason: reason }
        : app
    )
  );
};


  return (
    <div className="admin-page">
      <h2 className="admin-title">📋 Internship Applications</h2>

      {loading && <p>Loading applications...</p>}

      {!loading && apps.length === 0 && (
        <p className="empty">No applications found</p>
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

            <span className={`status-badge ${app.status.toLowerCase()}`}>
              {app.status}
            </span>

            {/* APPLIED */}
            {app.status === "APPLIED" && (
              <div className="admin-actions">
                <button className="approve" onClick={() => approve(app.applicationId)}>
                  Approve
                </button>
                <button className="reject" onClick={() => reject(app.applicationId)}>
                  Reject
                </button>
              </div>
            )}

            {/* ACCEPTED */}
           {app.status === "ACCEPTED" && (
              <div className="admin-actions">
                <button
                    className="reject"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reject?")) {
                        reject(app.applicationId);
                      }
                    }}
                  >
                    Do you want to reject?
                </button>
              </div>
            )}


            {/* REJECTED */}
            {app.status === "REJECTED" && (
              <div className="admin-actions">
                  <button
                      className="approve"
                      onClick={() => approve(app.applicationId)}
                    >
                      Do you want to accept?
                  </button>
              </div>
            )}



          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminApplications;
