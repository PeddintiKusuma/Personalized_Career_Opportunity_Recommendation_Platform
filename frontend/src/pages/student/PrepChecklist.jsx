import { useMemo, useState } from "react";
import { getChecklist, saveChecklist } from "../../services/localStore";

export default function PrepChecklist() {
  const [items, setItems] = useState(getChecklist());
  const done = items.filter((item) => item.done).length;
  const percent = useMemo(
    () => (items.length ? Math.round((done / items.length) * 100) : 0),
    [done, items.length]
  );

  const toggle = (id) => {
    const next = items.map((item) => (item.id === id ? { ...item, done: !item.done } : item));
    setItems(next);
    saveChecklist(next);
  };

  return (
    <div>
      <div className="page-title">
        <h1>Application prep</h1>
        <p>A simple checklist to keep internship season organized. Progress is saved on this device.</p>
      </div>
      <article className="card" style={{ marginBottom: 20 }}>
        <h3>{percent}% complete</h3>
        <div className="meter"><span style={{ width: `${percent}%` }} /></div>
      </article>
      <div className="checklist">
        {items.map((item) => (
          <label className="check-row" key={item.id}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} />
            <span className={item.done ? "done" : ""}>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
