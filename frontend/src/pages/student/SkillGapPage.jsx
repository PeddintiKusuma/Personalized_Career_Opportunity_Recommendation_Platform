import { useEffect, useState } from "react";
import { learningLinksFor, skillGap } from "../../data/skills";
import { apiGet } from "../../services/api";
import { getStudentId } from "../../services/auth";

export default function SkillGapPage() {
  const studentId = getStudentId();
  const [student, setStudent] = useState(null);
  const [internships, setInternships] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiGet(`/students/${studentId}`), apiGet("/internships")])
      .then(([profile, list]) => {
        setStudent(profile);
        setInternships(list || []);
        if (list?.[0]) setSelectedId(String(list[0].id));
      })
      .catch((err) => setError(err.message));
  }, [studentId]);

  const selected = internships.find((item) => String(item.id) === selectedId);
  const gap = selected
    ? skillGap(student?.skills || "", selected.requiredSkills || selected.title || "")
    : null;

  return (
    <div>
      <div className="page-title">
        <h1>Skill gap</h1>
        <p>Compare your profile with an internship. Missing skills link to free tutorials only.</p>
      </div>
      {error && <div className="alert error">{error}</div>}

      <div className="toolbar">
        <label>
          Internship
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {internships.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} — {item.company}
              </option>
            ))}
          </select>
        </label>
      </div>

      {gap && (
        <div className="split">
          <article className="card">
            <h3>Coverage {gap.coverage}%</h3>
            <div className="meter"><span style={{ width: `${gap.coverage}%` }} /></div>
            <p><b>Your skills:</b> {student?.skills || "Add skills in Profile"}</p>
            <p><b>Role needs:</b> {gap.need.join(", ") || "Title keywords only"}</p>
            <div className="chips">
              {gap.matched.map((skill) => (
                <span className="chip good" key={skill}>{skill}</span>
              ))}
              {gap.missing.map((skill) => (
                <span className="chip warn" key={skill}>{skill}</span>
              ))}
            </div>
          </article>
          <article className="card">
            <h3>Free practice</h3>
            {(gap.missing.length === 0 ? ["javascript"] : gap.missing).map((skill) => (
              <div key={skill} className="learn-block">
                <b>{skill}</b>
                {learningLinksFor(skill).map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                ))}
              </div>
            ))}
          </article>
        </div>
      )}
    </div>
  );
}
