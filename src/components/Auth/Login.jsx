import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiPost } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      setLoading(true);

      const res = await apiPost("/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      // ✅ Save user info
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("name", res.name);
      localStorage.setItem("email", res.email);

      // ✅ Redirect based on role
      if (res.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (res.role === "USER") {
        navigate("/user/dashboard");
      } else {
        alert("Unknown role");
      }

    } catch (err) {
      alert(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={login}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.footerText}>
          New user?{" "}
          <Link to="/signup" style={styles.link}>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--bg-gradient)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  title: {
    marginBottom: "30px",
    color: "#667eea",
    fontSize: "28px",
    fontWeight: "700",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "2px solid #e0e0e0",
    fontSize: "14px",
    background: "#f8f9fa",
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#667eea",
    fontWeight: "700",
    textDecoration: "none",
  },
};
