import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InternshipCard from "../../components/InternshipCard";
import ProjectCard from "../../components/ProjectCard";
import { apiGet, unwrapInternship, unwrapProject } from "../../services/api";
import { getSession, getStudentId } from "../../services/auth";

export default function StudentDashboard() {
  const studentId = getStudentId();
  const session = getSession();
  const [combined, setCombined] = useState([]);
  const [internships, setInternships] = useState([]);
  const [projects, setProjects] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiGet(`/recommendations/all/${studentId}`),
      apiGet(`/recommendations/${studentId}`),
      apiGet(`/project-recommendations/${studentId}`),
      apiGet(`/applications/student/${studentId}`),
    ])
      .then(([all, recI, recP, apps]) => {
        setCombined(all || []);
        setInternships((recI || []).map(unwrapInternship));
        setProjects((recP || []).map(unwrapProject));
        setAppliedIds((apps || []).map((app) => app.internship?.id).filter(Boolean));
      })
      .catch((err) => setError(err.message));
  }, [studentId]);

  return (
    <div>
      <div className="topbar">
        <div className="page-title">
          <h1>Hello{session?.name ? `, ${session.name.split(" ")[0]}` : ""}</h1>
          <p>Recommended internships and projects based on your current skill list.</p>
        </div>
        <div className="btn-row" style={{ marginTop: 0 }}>
          <Link className="btn ghost" to="/skill-gap">Skill gap</Link>
          <Link className="btn" to="/profile">Edit profile</Link>
        </div>
      </div>
      {error && <div className="alert error">{error}</div>}

      <div className="stats">
        <div className="stat">Top matches<strong>{combined.length}</strong></div>
        <div className="stat">Internships<strong>{internships.length}</strong></div>
        <div className="stat">Projects<strong>{projects.length}</strong></div>
        <div className="stat">Applied<strong>{appliedIds.length}</strong></div>
      </div>

      <section>
        <h2 style={{ marginBottom: 16 }}>Top matches</h2>
        {combined.length === 0 && (
          <p className="empty">No matches yet. Add skills such as java, react, or python, or scan a resume.</p>
        )}
        <div className="grid">
          {combined.map((item, index) =>
            item.type === "PROJECT" ? (
              <ProjectCard key={`p-${index}`} data={{ ...item, project: item.item, score: item.score }} />
            ) : (
              <InternshipCard
                key={`i-${index}`}
                data={{ ...item.item, score: item.score }}
                appliedIds={appliedIds}
                onApplied={(id) => setAppliedIds((prev) => [...prev, id])}
              />
            )
          )}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ marginBottom: 16 }}>Recommended internships</h2>
        <div className="grid">
          {internships.map((item) => (
            <InternshipCard
              key={item.id}
              data={item}
              appliedIds={appliedIds}
              onApplied={(id) => setAppliedIds((prev) => [...prev, id])}
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 36 }}>
        <h2 style={{ marginBottom: 16 }}>Recommended projects</h2>
        <div className="grid">
          {projects.map((item) => (
            <ProjectCard key={item.id} data={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
