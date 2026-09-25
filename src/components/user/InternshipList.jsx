import "./UserDashboard.css";
export default function InternshipList({ data, showApply }) {
  return (
    <div className="grid">
      {data.map(i => (
        <div className="card" key={i.id}>
          <h4>{i.title}</h4>
          <p><b>Company:</b> {i.company}</p>
          <p><b>Skills:</b> {i.requiredSkills}</p>

          {showApply && (
            <button className="btn" style={{ marginTop: "10px" }}>
              Apply
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
