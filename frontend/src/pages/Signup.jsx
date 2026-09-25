import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { apiPost } from "../services/api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skills: "java,react",
    interests: "web development",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const gmail = form.email.trim().toLowerCase();
      if (!gmail.endsWith("@gmail.com") || gmail === "@gmail.com") {
        setError("Only Gmail addresses (@gmail.com) are allowed");
        setLoading(false);
        return;
      }
      const res = await apiPost("/auth/signup", {
        ...form,
        email: gmail,
      });
      navigate(`/verify?token=${encodeURIComponent(res.verificationToken || "")}`);
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
        <h2>Create student account</h2>
        <p className="muted">Use a Gmail address (@gmail.com). Add skills so recommendations can be personalized.</p>
        {error && <div className="alert error">{error}</div>}
        <div className="form-field">
          <label>Full name</label>
          <input value={form.name} onChange={update("name")} required />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@gmail.com"
            pattern="[a-zA-Z0-9._%+\-]+@gmail\.com"
            title="Use a Gmail address ending with @gmail.com"
            required
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input type="password" value={form.password} onChange={update("password")} required />
        </div>
        <div className="form-field">
          <label>Skills (comma separated)</label>
          <input value={form.skills} onChange={update("skills")} placeholder="java, react, python" />
        </div>
        <div className="form-field">
          <label>Interests</label>
          <input value={form.interests} onChange={update("interests")} />
        </div>
        <button className="btn" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
          {loading ? "Creating account..." : "Sign up"}
        </button>
        <p className="muted" style={{ marginTop: 16 }}>
          Already have an account? <Link className="link" to="/login">Login</Link>
        </p>
      </form>
    </div>
    </PublicLayout>
  );
}
