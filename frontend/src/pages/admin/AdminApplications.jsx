import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../../services/api";

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState("");

  const load = () => apiGet("/applications").then(setApps).catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    await apiPut(`/applications/${id}/status`, undefined, { query: { status } });
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, status } : app)));
  };

  return (
    <div>
      <div className="page-title">
        <h1>Applications</h1>
        <p>Review student internship applications and update their status.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      <div className="grid" style={{ marginTop: 24 }}>
        {apps.length === 0 && <p className="empty">No applications yet.</p>}
        {apps.map((app) => (
          <article className="card" key={app.id}>
            <h3>{app.internship?.title}</h3>
            <p><b>Company:</b> {app.internship?.company}</p>
            <p><b>Student:</b> {app.student?.name}</p>
            <p><b>Email:</b> {app.student?.email}</p>
            <span className={`badge ${(app.status || "applied").toLowerCase()}`}>{app.status}</span>
            <div className="btn-row">
              <button className="btn success" onClick={() => setStatus(app.id, "ACCEPTED")}>Accept</button>
              <button className="btn danger" onClick={() => setStatus(app.id, "REJECTED")}>Reject</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
