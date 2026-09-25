import React, { useEffect, useState } from "react";
import API from "../../services/api";

function ApplicationStatus({ studentId }) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    API.get(`/applications/student/${studentId}`)
      .then(data => setApps(Array.isArray(data) ? data : []));
  }, [studentId]);

  return (
    <div className="card">
      <h2>📄 Application Tracker</h2>

      {apps.length === 0 && <p>No applications yet</p>}

      {apps.map(app => (
        <div key={app.id} className="internship-card">
          <h3>{app.internship.title}</h3>
          <p><b>Company:</b> {app.internship.company}</p>

          <span className={`badge ${app.status.toLowerCase()}`}>
            {app.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ApplicationStatus;
