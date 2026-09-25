import { useEffect, useState } from "react";
import FilterBar, { matchesQuery } from "../../components/FilterBar";
import ProjectCard from "../../components/ProjectCard";
import { apiGet } from "../../services/api";

export default function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet("/projects")
      .then(setItems)
      .catch((err) => setError(err.message));
  }, []);

  const visible = (items || []).filter((item) =>
    matchesQuery(item, query, ["title", "domain", "techStack", "description"])
  );

  return (
    <div>
      <div className="page-title">
        <h1>Projects</h1>
        <p>Academic and industry projects. Search by domain or tech stack.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      <FilterBar query={query} onQuery={setQuery} />
      <div className="grid">
        {visible.map((item) => (
          <ProjectCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
