import "./UserDashboard.css";
export default function ProjectList({ data }) {
  return (
    <div className="grid">
      {data.map(p => (
        <div className="card" key={p.id}>
          <h4>{p.title}</h4>
          <p>{p.description}</p>
          <p><b>Skills:</b> {p.skills}</p>
        </div>
      ))}
    </div>
  );
}
