import { Navigate } from "react-router-dom";
import { getSession } from "../services/auth";
import Sidebar from "./Sidebar";

export default function ProtectedRoute({ children, role }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role && session.role !== role && !(role === "STUDENT" && session.role === "USER")) {
    return <Navigate to={session.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"} replace />;
  }

  if (session.role !== "ADMIN" && session.verified === false) {
    return <Navigate to="/verify" replace />;
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}
