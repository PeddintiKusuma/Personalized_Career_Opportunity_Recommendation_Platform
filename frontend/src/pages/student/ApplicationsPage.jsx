import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { getStudentId } from "../../services/auth";
import { getApplicationNotes, saveApplicationNote } from "../../services/localStore";

export default function ApplicationsPage() {
  const studentId = getStudentId();
  const [apps, setApps] = useState([]);
  const [notes, setNotes] = useState(getApplicationNotes());
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet(`/applications/student/${studentId}`)
      .then(setApps)
      .catch((err) => setError(err.message));
  }, [studentId]);

  const exportCsv = () => {
    const header = "Title,Company,Location,Status,Note";
    const rows = apps.map((app) =>
      [app.internship?.title, app.internship?.company, app.internship?.location, app.status, notes[app.id] || ""]
        .map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`)
        .join(",")
    );
    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="topbar">
        <div className="page-title">
          <h1>My applications</h1>
          <p>Track status and keep private notes on this device. Export is a local CSV file.</p>
        </div>
        <button className="btn ghost" onClick={exportCsv} disabled={!apps.length}>Export CSV</button>
      </div>
      {error && <div className="alert error">{error}</div>}
      <div className="grid" style={{ marginTop: 8 }}>
        {apps.length === 0 && <p className="empty">You have not applied to any internships yet.</p>}
        {apps.map((app) => (
          <article className="card" key={app.id}>
            <h3>{app.internship?.title || "Internship"}</h3>
            <p><b>Company:</b> {app.internship?.company}</p>
            <p><b>Location:</b> {app.internship?.location}</p>
            <span className={`badge ${(app.status || "applied").toLowerCase()}`}>{app.status}</span>
            <div className="form-field">
              <label>Private note</label>
              <textarea
                rows={3}
                value={notes[app.id] || ""}
                onChange={(e) => {
                  const next = saveApplicationNote(app.id, e.target.value);
                  setNotes({ ...next });
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
