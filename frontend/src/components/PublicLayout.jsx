import { Link } from "react-router-dom";
import { getSession } from "../services/auth";

export default function PublicLayout({ children }) {
  const session = getSession();
  const dashboard = session
    ? session.role === "ADMIN"
      ? "/admin/dashboard"
      : "/dashboard"
    : null;

  return (
    <div className="public-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <Link to="/" className="brand brand-link">CareerHub</Link>
          <nav className="site-nav">
            <a href="/#how">How it works</a>
            <a href="/#features">Features</a>
            <Link to="/resources">Free learning</Link>
            <a href="/#faq">FAQ</a>
          </nav>
          <div className="header-actions">
            {dashboard ? (
              <Link className="btn" to={dashboard}>Dashboard</Link>
            ) : (
              <>
                <Link className="btn ghost" to="/login">Login</Link>
                <Link className="btn" to="/signup">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="site-header-inner footer-grid">
          <div>
            <div className="brand">CareerHub</div>
            <p className="muted">A student-built platform for internship and project discovery. No paid APIs or subscriptions required.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/resources">Free resources</Link>
            <Link to="/signup">Create account</Link>
          </div>
          <div>
            <h4>For campuses</h4>
            <Link to="/admin/login">Admin login</Link>
            <p className="muted">Manage internships, projects, and applications from one dashboard.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
