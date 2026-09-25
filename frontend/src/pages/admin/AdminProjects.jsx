import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../../services/api";

const empty = { title: "", domain: "", techStack: "", description: "" };

export default function AdminProjects() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const load = () => apiGet("/projects").then(setItems).catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const add = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await apiPost("/projects", form);
      setForm(empty);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await apiDelete(`/projects/${id}`);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <div className="page-title">
        <h1>Projects</h1>
        <p>Publish academic or industry project opportunities.</p>
      </div>
      {error && <div className="alert error">{error}</div>}
      <form className="card" style={{ margin: "24px 0" }} onSubmit={add}>
        <h3>Add project</h3>
        <div className="form-grid" style={{ marginTop: 12 }}>
          <input placeholder="Title" value={form.title} onChange={update("title")} required />
          <input placeholder="Domain" value={form.domain} onChange={update("domain")} />
          <input placeholder="Tech stack" value={form.techStack} onChange={update("techStack")} />
        </div>
        <div className="form-field">
          <textarea placeholder="Description" value={form.description} onChange={update("description")} />
        </div>
        <button className="btn">Add project</button>
      </form>
      <div className="grid">
        {items.map((item) => (
          <article className="card" key={item.id}>
            <h3>{item.title}</h3>
            <p><b>Domain:</b> {item.domain}</p>
            <p>{item.description}</p>
            <button className="btn danger" onClick={() => remove(item.id)}>Delete</button>
          </article>
        ))}
      </div>
    </div>
  );
}
