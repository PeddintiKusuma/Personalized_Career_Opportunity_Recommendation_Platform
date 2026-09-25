import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";
import "./Admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await apiPost("/auth/admin/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      // ✅ Save admin info
      localStorage.setItem("adminId", res.id);
      localStorage.setItem("adminEmail", res.email);
      localStorage.setItem("adminRole", res.role);

      // ✅ Redirect to admin dashboard
      navigate("/admin/dashboard");

    } catch (err) {
      alert(err.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={login}>
        <h2 style={styles.title}>Admin Login</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Admin Email"
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
    background: "linear-gradient(135deg, #141e30, #243b55)",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    background: "#243b55",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
