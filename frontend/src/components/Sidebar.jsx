import { NavLink, useNavigate } from "react-router-dom";
import { clearSession, getSession, isAdmin } from "../services/auth";

const studentLinks = [
  ["/dashboard", "Dashboard"],
  ["/internships", "Internships"],
  ["/projects", "Projects"],
  ["/applications", "Applications"],
  ["/saved", "Saved"],
  ["/skill-gap", "Skill gap"],
  ["/resume-scan", "Resume scan"],
  ["/prep", "Prep checklist"],
  ["/resources", "Free learning"],
  ["/profile", "Profile"],
];

const adminLinks = [
  ["/admin/dashboard", "Overview"],
  ["/admin/internships", "Internships"],
  ["/admin/projects", "Projects"],
  ["/admin/applications", "Applications"],
  ["/admin/students", "Students"],
];

export default function Sidebar() {
  const navigate = useNavigate();
  const session = getSession();
  const admin = isAdmin();
  const links = admin ? adminLinks : studentLinks;

  return (
    <aside className="sidebar">
      <div className="brand">CareerHub</div>
      <p className="muted" style={{ marginBottom: 18 }}>{session?.name}</p>
      {links.map(([to, label]) => (
        <NavLink key={to} to={to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          {label}
        </NavLink>
      ))}
      <button
        className="nav-link"
        onClick={() => {
          clearSession();
          navigate("/login");
        }}
        style={{ marginTop: 20 }}
      >
        Logout
      </button>
    </aside>
  );
}
