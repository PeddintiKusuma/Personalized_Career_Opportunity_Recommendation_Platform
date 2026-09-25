import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";
import "./Admin.css";

function AdminInternships() {
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    duration: "",
    requiredSkills: ""
  });

  useEffect(() => {
    fetchInternships();
  }, []);

  // 🔹 FETCH INTERNSHIPS (USER API)
  const fetchInternships = async () => {
    try {
      const data = await apiGet("/internships");

      if (Array.isArray(data)) {
        setInternships(data); // newest will be at bottom (id ASC)
      } else {
        setInternships([]);
      }
    } catch (err) {
      console.error("Fetch internships failed", err);
      setInternships([]);
    }
  };

  // 🔹 ADD INTERNSHIP (ADMIN API)
  const submitInternship = async () => {
    if (!form.title || !form.company) return;

    try {
      await apiPost("/admin/internships", form);

      setForm({
        title: "",
        company: "",
        location: "",
        duration: "",
        requiredSkills: ""
      });

      fetchInternships(); // refresh list
    } catch (err) {
      console.error("Add internship failed", err);
    }
  };

  // 🔹 DELETE INTERNSHIP (ADMIN API)
  const deleteInternship = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this internship?");
    if (!confirmDelete) return;

    try {
      await apiDelete(`/admin/internships/${id}`);
      setInternships(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error("Delete internship failed", err);
    }
  };

  return (
    <div className="admin-card">
      <h2>🎯 Internship Management</h2><br />

      {/* ADD INTERNSHIP */}
      <div className="internship-form">
        <h3>➕ Add Internship</h3>

        <div className="form-row">
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Company"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
          />
        </div>

        <div className="form-row">
          <input
            placeholder="Location"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
          <input
            placeholder="Duration"
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
        </div>

        <input
          placeholder="Required Skills (html,css,js)"
          value={form.requiredSkills}
          onChange={e => setForm({ ...form, requiredSkills: e.target.value })}
        />

        <button onClick={submitInternship}>Add Internship</button>
      </div>

     {/* INTERNSHIP LIST */}
{internships.length === 0 ? (
  <p className="empty">No internships found</p>
) : (
  <div className="admin-internship-grid">
    {internships.map(i => (
      <div key={i.id} className="admin-internship-card">
        <h3 className="card-title">{i.title}</h3>
        
        <div className="card-detail-row">
          <span className="detail-label">Company: </span>
          <span className="detail-value">{i.company}</span>
        </div>

        <div className="card-detail-row">
          <span className="detail-label">Location: </span>
          <span className="detail-value">{i.location}</span>
        </div>

        <div className="card-detail-row">
          <span className="detail-label">Duration: </span>
          <span className="detail-value">{i.duration}</span>
        </div>

    <div className="card-footer">
  <div className="student-skills">
    {i.requiredSkills?.split(",").map(skill => (
      <span key={skill} className="skill-chip">
        {skill.trim()}
      </span>
    ))}
  </div>

  <div className="delete-row">
    <button
      className="delete-btn"
      onClick={() => deleteInternship(i.id)}
    >
      🗑 Delete Internship
    </button>
  </div>
</div>

      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default AdminInternships;
