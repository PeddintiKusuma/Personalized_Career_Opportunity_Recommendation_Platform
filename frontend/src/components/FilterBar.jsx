export default function FilterBar({ query, onQuery, extra }) {
  return (
    <div className="toolbar">
      <label style={{ flex: 1, minWidth: 220 }}>
        Search
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Title, company, skill, location…"
        />
      </label>
      {extra}
    </div>
  );
}

export function matchesQuery(item, query, fields) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((field) => String(item[field] || "").toLowerCase().includes(q));
}
