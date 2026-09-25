export default function ProjectCard({ data }) {
  const project = data.project || data.item || data;
  const skills = project.techStack
    ? project.techStack.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <article className="card">
      <h3>{project.title}</h3>
      <p><b>Domain:</b> {project.domain}</p>
      <p>{project.description}</p>
      {data.score != null && <span className="badge score">Match {data.score}</span>}
      {skills.length > 0 && (
        <div className="chips">
          {skills.map((skill) => (
            <span className="chip" key={skill}>{skill}</span>
          ))}
        </div>
      )}
    </article>
  );
}
