import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { apiPost } from "../services/api";
import { saveSession } from "../services/auth";

export default function Login({ adminOnly = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(adminOnly ? "admin@gmail.com" : "");
  const [password, setPassword] = useState(adminOnly ? "admin123" : "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const gmail = email.trim().toLowerCase();
      if (!gmail.endsWith("@gmail.com") || gmail === "@gmail.com") {
        setError("Only Gmail addresses (@gmail.com) are allowed");
        return;
      }

      const res = await apiPost("/auth/login", {
        email: gmail,
        password,
      });

      if (adminOnly && res.role !== "ADMIN") {
        setError("This page is for administrators only.");
        return;
      }

      if (res.role !== "ADMIN" && res.verified === false) {
        saveSession(res);
        navigate("/verify");
        return;
      }

      saveSession(res);
      navigate(res.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>{adminOnly ? "Admin login" : "Student login"}</h2>
        <p className="muted">
          {adminOnly
            ? "Use the seeded admin account to manage internships, projects, and applications."
            : "Sign in to view recommendations and apply for internships."}
        </p>
        {error && <div className="alert error">{error}</div>}
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            pattern="[a-zA-Z0-9._%+\-]+@gmail\.com"
            title="Use a Gmail address ending with @gmail.com"
            required
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="muted" style={{ marginTop: 16 }}>
          {adminOnly ? (
            <>Student? <Link className="link" to="/login">Go to student login</Link></>
          ) : (
            <>
              New here? <Link className="link" to="/signup">Create an account</Link>
              <br />
              Admin? <Link className="link" to="/admin/login">Admin login</Link>
            </>
          )}
        </p>
      </form>
    </div>
    </PublicLayout>
  );
}
