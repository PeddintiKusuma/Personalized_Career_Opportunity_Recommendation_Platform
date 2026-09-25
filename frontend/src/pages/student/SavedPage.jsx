import { useMemo, useState } from "react";
import InternshipCard from "../../components/InternshipCard";
import { getSavedInternships } from "../../services/localStore";

export default function SavedPage() {
  const [items, setItems] = useState(getSavedInternships());
  const empty = useMemo(() => items.length === 0, [items]);

  return (
    <div>
      <div className="page-title">
        <h1>Saved internships</h1>
        <p>A private shortlist stored in this browser. Nothing is billed and nothing is sent to a third-party service.</p>
      </div>
      {empty && <p className="empty">No saved internships yet. Use Save on any internship card.</p>}
      <div className="grid">
        {items.map((item) => (
          <InternshipCard
            key={item.id}
            data={item}
            onSavedChange={() => setItems(getSavedInternships())}
          />
        ))}
      </div>
    </div>
  );
}
