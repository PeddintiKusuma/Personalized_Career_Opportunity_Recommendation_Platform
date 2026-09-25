import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../../services/api";
import { getStudentId } from "../../services/auth";

export default function ProfilePage() {
  const studentId = getStudentId();
  const [form, setForm] = useState({ name: "", email: "", skills: "", interests: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiGet(`/students/${studentId}`)
      .then((student) => {
        setForm({
          name: student.name || "",
          email: student.email || "",
          skills: student.skills || "",
          interests: student.interests || "",
        });
      })
      .catch((err) => setError(err.message));
  }, [studentId]);

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const save = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await apiPut(`/students/${studentId}`, {
        name: form.name,
        skills: form.skills,
        interests: form.interests,
      });
      setMessage("Profile updated. Recommendations will use your latest skills.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Profile</h1>
        <p>Keep your skills current so internship and project matches stay relevant.</p>
      </div>
      <form className="card" style={{ maxWidth: 560, marginTop: 24 }} onSubmit={save}>
        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}
        <div className="form-field">
          <label>Name</label>
          <input value={form.name} onChange={update("name")} />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input value={form.email} disabled />
        </div>
        <div className="form-field">
          <label>Skills</label>
          <input value={form.skills} onChange={update("skills")} placeholder="java, react, python" />
        </div>
        <div className="form-field">
          <label>Interests</label>
          <input value={form.interests} onChange={update("interests")} />
        </div>
        <button className="btn" disabled={loading}>{loading ? "Saving..." : "Save profile"}</button>
      </form>
    </div>
  );
}
