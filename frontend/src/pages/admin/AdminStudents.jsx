import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/students")
      .then(setStudents)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <div className="page-title">
        <h1>Students</h1>
        <p>Registered users on the platform.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      <div className="grid" style={{ marginTop: 24 }}>
        {students.map((student) => (
          <article className="card" key={student.id}>
            <h3>{student.name}</h3>
            <p>{student.email}</p>
            <p><b>Role:</b> {student.role || "STUDENT"}</p>
            <p><b>Skills:</b> {student.skills || "Not set"}</p>
            <span className={`badge ${student.verified ? "accepted" : "applied"}`}>
              {student.verified ? "Verified" : "Pending"}
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
