import { useEffect, useMemo, useState } from "react";
import FilterBar, { matchesQuery } from "../../components/FilterBar";
import InternshipCard from "../../components/InternshipCard";
import { apiGet } from "../../services/api";
import { getStudentId } from "../../services/auth";

export default function InternshipsPage() {
  const studentId = getStudentId();
  const [items, setItems] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      apiGet("/internships"),
      apiGet(`/applications/student/${studentId}`),
    ])
      .then(([internships, apps]) => {
        setItems(internships || []);
        setAppliedIds((apps || []).map((app) => app.internship?.id).filter(Boolean));
      })
      .catch((err) => setError(err.message));
  }, [studentId]);

  const locations = useMemo(
    () => ["all", ...new Set(items.map((item) => item.location).filter(Boolean))],
    [items]
  );

  const visible = items.filter((item) => {
    const textMatch = matchesQuery(item, query, ["title", "company", "location", "duration", "requiredSkills"]);
    const locMatch = location === "all" || item.location === location;
    return textMatch && locMatch;
  });

  return (
    <div>
      <div className="page-title">
        <h1>Internships</h1>
        <p>Search, filter by location, save a shortlist, and apply in one place.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      <FilterBar
        query={query}
        onQuery={setQuery}
        extra={(
          <label>
            Location
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc === "all" ? "All locations" : loc}</option>
              ))}
            </select>
          </label>
        )}
      />
      <p className="muted">{visible.length} result{visible.length === 1 ? "" : "s"}</p>
      <div className="grid" style={{ marginTop: 16 }}>
        {visible.map((item) => (
          <InternshipCard
            key={item.id}
            data={item}
            appliedIds={appliedIds}
            onApplied={(id) => setAppliedIds((prev) => [...prev, id])}
          />
        ))}
      </div>
    </div>
  );
}
