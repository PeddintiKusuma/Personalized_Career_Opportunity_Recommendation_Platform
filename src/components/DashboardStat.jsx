import React from "react";
import DashboardStats from "../components/DashboardStats";
import StudentProfile from "../components/StudentProfile";

function Dashboard({ students, applications, studentIdFromLogin }) {

  return (
    <div style={styles.page}>

      {/* LEFT SIDE - DASHBOARD CONTENT */}
      <div style={styles.left}>
        <h2>Student Dashboard</h2>

        <button>Recommend for Me</button>

        <DashboardStats
          students={students}
          applications={applications}
        />

        {/* Internships list stays here */}
      </div>

      {/* RIGHT SIDE - STUDENT PROFILE */}
      <StudentProfile studentId={studentIdFromLogin} />

    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    alignItems: "flex-start"
  },
  left: {
    flex: 1,
    padding: "20px",
    marginRight: "320px" // space for fixed profile
  }
};

export default Dashboard;
