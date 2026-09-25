import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../../services/api";

export default function AdminDashboard() {
  const [internships, setInternships] = useState([]);
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiGet("/internships"),
      apiGet("/projects"),
      apiGet("/applications"),
      apiGet("/students"),
    ])
      .then(([i, p, a, s]) => {
        setInternships(i || []);
        setProjects(p || []);
        setApplications(a || []);
        setStudents(s || []);
      })
      .catch((err) => setError(err.message));
  }, []);

  const counts = useMemo(() => {
    const total = applications.length || 1;
    const of = (status) => applications.filter((app) => (app.status || "").toUpperCase() === status).length;
    return [
      { label: "Applied", value: of("APPLIED"), pct: Math.round((of("APPLIED") / total) * 100) },
      { label: "Accepted", value: of("ACCEPTED"), pct: Math.round((of("ACCEPTED") / total) * 100) },
      { label: "Rejected", value: of("REJECTED"), pct: Math.round((of("REJECTED") / total) * 100) },
    ];
  }, [applications]);

  return (
    <div>
      <div className="page-title">
        <h1>Admin overview</h1>
        <p>Live counts from your database. Charts are drawn in CSS—no paid analytics product.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      <div className="stats" style={{ marginTop: 24 }}>
        <div className="stat">Internships<strong>{internships.length}</strong></div>
        <div className="stat">Projects<strong>{projects.length}</strong></div>
        <div className="stat">Applications<strong>{applications.length}</strong></div>
        <div className="stat">Students<strong>{students.length}</strong></div>
      </div>
      <div className="split">
        <article className="card">
          <h3>Application status</h3>
          {counts.map((row) => (
            <div className="bar-row" key={row.label}>
              <span>{row.label}</span>
              <div className="bar"><i style={{ width: `${row.pct}%` }} /></div>
              <b>{row.value}</b>
            </div>
          ))}
        </article>
        <article className="card">
          <h3>Recent applications</h3>
          {applications.slice(-5).reverse().map((app) => (
            <p key={app.id}>
              <b>{app.student?.name}</b> → {app.internship?.title}{" "}
              <span className={`badge ${(app.status || "applied").toLowerCase()}`}>{app.status}</span>
            </p>
          ))}
          {applications.length === 0 && <p className="muted">No applications yet.</p>}
        </article>
      </div>
    </div>
  );
}
