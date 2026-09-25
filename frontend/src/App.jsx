import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Resources from "./pages/Resources";
import StudentDashboard from "./pages/student/StudentDashboard";
import InternshipsPage from "./pages/student/InternshipsPage";
import ProjectsPage from "./pages/student/ProjectsPage";
import ApplicationsPage from "./pages/student/ApplicationsPage";
import ProfilePage from "./pages/student/ProfilePage";
import SkillGapPage from "./pages/student/SkillGapPage";
import ResumeScanner from "./pages/student/ResumeScanner";
import SavedPage from "./pages/student/SavedPage";
import PrepChecklist from "./pages/student/PrepChecklist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInternships from "./pages/admin/AdminInternships";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminStudents from "./pages/admin/AdminStudents";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/admin/login" element={<Login adminOnly />} />

      <Route path="/dashboard" element={<ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>} />
      <Route path="/internships" element={<ProtectedRoute role="STUDENT"><InternshipsPage /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute role="STUDENT"><ProjectsPage /></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute role="STUDENT"><ApplicationsPage /></ProtectedRoute>} />
      <Route path="/saved" element={<ProtectedRoute role="STUDENT"><SavedPage /></ProtectedRoute>} />
      <Route path="/skill-gap" element={<ProtectedRoute role="STUDENT"><SkillGapPage /></ProtectedRoute>} />
      <Route path="/resume-scan" element={<ProtectedRoute role="STUDENT"><ResumeScanner /></ProtectedRoute>} />
      <Route path="/prep" element={<ProtectedRoute role="STUDENT"><PrepChecklist /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute role="STUDENT"><ProfilePage /></ProtectedRoute>} />

      <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/internships" element={<ProtectedRoute role="ADMIN"><AdminInternships /></ProtectedRoute>} />
      <Route path="/admin/projects" element={<ProtectedRoute role="ADMIN"><AdminProjects /></ProtectedRoute>} />
      <Route path="/admin/applications" element={<ProtectedRoute role="ADMIN"><AdminApplications /></ProtectedRoute>} />
      <Route path="/admin/students" element={<ProtectedRoute role="ADMIN"><AdminStudents /></ProtectedRoute>} />

      <Route path="/user/dashboard" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
