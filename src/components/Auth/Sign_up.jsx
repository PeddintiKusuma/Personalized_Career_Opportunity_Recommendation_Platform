import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await apiPost("/auth/signup", {
        name,
        email,
        password,
      });

      alert(res.message);

      // ✅ Redirect to login page
      navigate("/login");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={signup}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
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
  },

  card: {
    width: "100%",
    maxWidth: "420px", 
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
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
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    background: "#667eea",
  
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  footerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
    textAlign: "center",
  },

  link: {
    color: "#667eea",
    cursor: "pointer",
    fontWeight: "bold",
    display: "inline-block",
  },
};
