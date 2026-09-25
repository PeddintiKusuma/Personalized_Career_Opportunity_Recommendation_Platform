import { useEffect, useState } from "react";
import { apiPost, apiGet, apiDelete } from "../../services/api";
import "./UserDashboard.css";

export default function InternshipCard({ data }) {

  const userId = localStorage.getItem("userId");
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Function to check applied status
  const checkApplied = async () => {
    if (!userId) return;
    try {
      const res = await apiGet(
        `/applications/applied/${userId}/${data.id}`
      );
      setApplied(res);
    } catch {
      setApplied(false);
    }
  };

  // 🔹 Initial check
  useEffect(() => {
    checkApplied();
    // eslint-disable-next-line
  }, []);

  // 🔹 Apply
  const apply = async () => {
    setLoading(true);
    try {
      await apiPost("/applications/apply", {
        userId,
        internshipId: data.id,
      });
      await checkApplied(); // 🔥 re-check from backend
    } catch (err) {
      console.error("Apply failed", err);
    }
    setLoading(false);
  };

  // 🔹 Cancel
  const cancelApply = async () => {
    setLoading(true);
    try {
      await apiDelete(
        `/applications/cancel/${userId}/${data.id}`
      );
      await checkApplied(); // 🔥 re-check from backend
    } catch (err) {
      console.error("Cancel failed", err);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h3>{data.title}</h3>
      <p><b>Company: </b> {data.company}</p>
      <p><b>Location: </b> {data.location}</p>
      <p><b>Duration: </b> {data.duration}</p>
      <p><b>Skills: </b> {data.requiredSkills}</p>

      {!applied ? (
        <button
          className="apply-btn"
          onClick={apply}
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply"}
        </button>
      ) : (
        <div className="applied-row">
          <span className="applied-text">Applied ✅</span> 
          <button
            className="cancel-btn"
            onClick={cancelApply}
            disabled={loading}
            title="Cancel application"
          >
            ❌ Cancel Application
          </button>
        </div>
      )}
    </div>
  );
}
