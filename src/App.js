import { Routes, Route } from "react-router-dom";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Sign_up";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminUsers from "./components/Admin/AdminUsers";
import UserDashboard from "./components/user/UserDashboard";
import AdminApplications from "./components/Admin/AdminApplications";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminAcceptedInternships from "./components/Admin/AdminAcceptedInternships";
import UserAppliedInternships from "./components/user/UserAppliedInternships";

function App() {

  // ✅ CORRECT: get userId (not studentId)
  const userId = localStorage.getItem("userId");

  console.log("App.js userId:", userId);

  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/applications" element={<AdminApplications />} />
       <Route path="/admin/accepted" element={<AdminAcceptedInternships />} />


      {/* User */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      
      <Route path="/user/applied" element={<UserAppliedInternships />}
/>

     
    </Routes>
  );
}

export default App;
