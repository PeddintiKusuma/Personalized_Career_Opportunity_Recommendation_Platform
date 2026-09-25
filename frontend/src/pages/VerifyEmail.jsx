import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PublicLayout from "../components/PublicLayout";
import { apiGet } from "../services/api";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const tokenFromQuery = params.get("token") || "";
  const [token, setToken] = useState(tokenFromQuery);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const hint = useMemo(
    () =>
      tokenFromQuery
        ? "Your verification link is ready. Confirm below to activate the account."
        : "Enter the verification token from signup, then confirm your email.",
    [tokenFromQuery]
  );

  const verify = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!token) {
      setError("Verification token is missing.");
      return;
    }
    setLoading(true);
    try {
      const res = await apiGet(`/auth/verify/${token}`);
      setMessage(res.message || "Email verified successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
    <div className="auth-page">
      <form className="auth-card" onSubmit={verify}>
        <h2>Verify email</h2>
        <p className="muted">{hint}</p>
        {error && <div className="alert error">{error}</div>}
        {message && <div className="alert success">{message}</div>}
        <div className="form-field">
          <label>Verification token</label>
          <input value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <button className="btn" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Verifying..." : "Verify account"}
        </button>
        {message && (
          <p className="muted" style={{ marginTop: 16 }}>
            <Link className="link" to="/login">Continue to login</Link>
          </p>
        )}
      </form>
    </div>
    </PublicLayout>
  );
}
