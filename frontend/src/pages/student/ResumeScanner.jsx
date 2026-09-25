import { useState } from "react";
import { extractSkillsFromText } from "../../data/skills";
import { apiPut } from "../../services/api";
import { getStudentId } from "../../services/auth";

export default function ResumeScanner() {
  const studentId = getStudentId();
  const [text, setText] = useState("");
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const scan = () => {
    setMessage("");
    setError("");
    setSkills(extractSkillsFromText(text));
  };

  const saveToProfile = async () => {
    if (!skills.length) return;
    try {
      await apiPut(`/students/${studentId}`, { skills: skills.join(", ") });
      setMessage("Skills added to your profile. Open Dashboard to refresh matches.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="page-title">
        <h1>Resume skill scan</h1>
        <p>Paste text from your resume. Skills are detected in the browser—no paid parser and no file upload service.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      {message && <div className="alert success">{message}</div>}
      <textarea
        rows={12}
        placeholder="Paste resume text here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="btn-row">
        <button className="btn" onClick={scan}>Scan skills</button>
        <button className="btn ghost" disabled={!skills.length} onClick={saveToProfile}>
          Save skills to profile
        </button>
      </div>
      <div className="chips" style={{ marginTop: 16 }}>
        {skills.length === 0 && <p className="muted">No skills detected yet.</p>}
        {skills.map((skill) => (
          <span className="chip" key={skill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}
