import { useEffect, useState } from "react";
import "./UserDashboard.css";

export default function UserProfile({ userId, onClose }) {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setSkills(data.skills ? data.skills.split(",") : []);
      });
  }, [userId]);

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (index) => {
  setSkills(prev =>
    prev.filter((_, i) => i !== index)
  );
};


  const saveSkills = async () => {
    setSaving(true);
    await fetch(`http://localhost:8080/api/users/${userId}/skills`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skills: skills.join(",") }),
    });
    setEditMode(false);
    setSaving(false);
    alert("Skills saved ✅");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">

      {/* HEADER */}
      <div className="profile-header">
        <h3>User Profile</h3>

        <button
          className="profile-close-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (typeof onClose === "function") {
              onClose();
            }
          }}
        >
          ✕
        </button>
      </div>

      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>

      <hr />

      <h4>Skills</h4>

      <div className="profile-skills">
        {skills.map((s, i) => (
          <span key={i} className="skill-chip">
            {s}
            {editMode && (
              <span
                className="skill-remove"
               onClick={(e) => {
                  e.stopPropagation();
                  removeSkill(i);
              }}

              >
                ✕
              </span>
            )}
          </span>
        ))}
      </div>

      {editMode ? (
  <>
    <input
      className="profile-input"
      value={newSkill}
      onChange={e => setNewSkill(e.target.value)}
      placeholder="Add skill"
    />

    <div className="profile-action-row">
      <button className="profile-btn" onClick={addSkill}>
        Add
      </button>

      <button
        className="profile-btn primary"
        onClick={saveSkills}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  </>
) : (
  <button
    className="profile-btn"
    onClick={() => setEditMode(true)}
  >
    Edit Skills
  </button>
)}

    </div>
  );
}
