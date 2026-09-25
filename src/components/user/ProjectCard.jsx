import "./UserDashboard.css";

export default function ProjectCard({ data }) {
  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p>{data.description}</p>

      <div className="tags">
        {data.skills?.split(",").map(s => (
          <span key={s} className="tag">
            {s.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}
