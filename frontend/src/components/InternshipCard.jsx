import { useState } from "react";
import { apiPost } from "../services/api";
import { getStudentId } from "../services/auth";
import { isInternshipSaved, toggleSavedInternship } from "../services/localStore";

export default function InternshipCard({ data, appliedIds = [], onApplied, onSavedChange }) {
  const internship = data.internship || data;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(isInternshipSaved(internship.id));
  const studentId = getStudentId();
  const alreadyApplied = appliedIds.includes(internship.id);

  const apply = async () => {
    if (!studentId) {
      setError("Please log in to apply.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await apiPost("/applications", undefined, {
        query: { studentId, internshipId: internship.id },
      });
      onApplied?.(internship.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const save = () => {
    toggleSavedInternship({
      id: internship.id,
      title: internship.title,
      company: internship.company,
      location: internship.location,
      duration: internship.duration,
      requiredSkills: internship.requiredSkills,
    });
    setSaved(isInternshipSaved(internship.id));
    onSavedChange?.();
  };

  const skills = internship.requiredSkills
    ? internship.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <article className="card">
      <h3>{internship.title}</h3>
      <p><b>Company:</b> {internship.company}</p>
      <p><b>Location:</b> {internship.location}</p>
      <p><b>Duration:</b> {internship.duration}</p>
      {data.score != null && <span className="badge score">Match {data.score}</span>}
      {skills.length > 0 && (
        <div className="chips">
          {skills.map((skill) => (
            <span className="chip" key={skill}>{skill}</span>
          ))}
        </div>
      )}
      {error && <div className="alert error">{error}</div>}
      <div className="btn-row">
        <button className="btn" disabled={busy || alreadyApplied} onClick={apply}>
          {alreadyApplied ? "Applied" : busy ? "Applying..." : "Apply"}
        </button>
        <button className="btn ghost" onClick={save}>
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
