import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../../services/api";

const empty = { title: "", company: "", location: "", duration: "", requiredSkills: "" };

export default function AdminInternships() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const load = () => apiGet("/internships").then(setItems).catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const add = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await apiPost("/internships", form);
      setForm(empty);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this internship?")) return;
    await apiDelete(`/internships/${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="page-title">
        <h1>Internships</h1>
        <p>Add and remove internship opportunities.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      <form className="card" style={{ margin: "24px 0" }} onSubmit={add}>
        <h3>Add internship</h3>
        <div className="form-grid" style={{ marginTop: 12 }}>
          <input placeholder="Title" value={form.title} onChange={update("title")} required />
          <input placeholder="Company" value={form.company} onChange={update("company")} required />
          <input placeholder="Location" value={form.location} onChange={update("location")} />
          <input placeholder="Duration" value={form.duration} onChange={update("duration")} />
        </div>
        <div className="form-field">
          <input placeholder="Required skills (java,spring)" value={form.requiredSkills} onChange={update("requiredSkills")} />
        </div>
        <button className="btn">Add internship</button>
      </form>
      <div className="grid">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <h3>{item.title}</h3>
            <p><b>Company:</b> {item.company}</p>
            <p><b>Location:</b> {item.location}</p>
            <p><b>Duration:</b> {item.duration}</p>
            <button className="btn danger" onClick={() => remove(item.id)}>Delete</button>
          </article>
        ))}
      </div>
    </div>
  );
}
