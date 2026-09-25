import { useEffect, useState } from "react";
import InternshipCard from "./InternshipCard";
import ProjectCard from "./ProjectCard";
import UserProfile from "./UserProfile";
import UserAppliedInternships from "./UserAppliedInternships";
import { apiGet } from "../../services/api";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [internships, setInternships] = useState([]);
  const [projects, setProjects] = useState([]);

  const [recommendedInternships, setRecommendedInternships] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);

  const [activeTab, setActiveTab] = useState("INTERNSHIPS");
  const [showProfile, setShowProfile] = useState(false);
  const [recommendMode, setRecommendMode] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    apiGet("/internships").then(setInternships);
    apiGet("/projects").then(setProjects);
  }, []);

  const recommendForMe = async () => {
    if (!userId) {
      alert("Login required");
      return;
    }

    try {
      const recInternships = await apiGet(
        `/recommend/internships/${userId}`
      );
      const recProjects = await apiGet(
        `/recommend/projects/${userId}`
      );

      setRecommendedInternships(recInternships);
      setRecommendedProjects(recProjects);
      setRecommendMode(true);
    } catch (err) {
      console.error("Recommendation failed", err);
      alert("Recommendation failed");
    }
  };

  const showAll = () => {
    setRecommendMode(false);
  };

  const internshipList = recommendMode
    ? recommendedInternships
    : internships;

  const projectList = recommendMode
    ? recommendedProjects
    : projects;

  return (
    <div className="page">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h3>Menu</h3>

        <button onClick={() => setActiveTab("INTERNSHIPS")}>
          Internships
        </button>

        <button onClick={() => setActiveTab("PROJECTS")}>
          Projects
        </button>

        <button onClick={() => setActiveTab("APPLIED")}>
           Applied Internships
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="content"
        style={{ marginRight: showProfile ? "320px" : "0px" }}
      >
        {/* TOP BAR (hide for applied tab) */}
        {activeTab !== "APPLIED" && (
          <div className="topBar">
            <button className="recommendBtn" onClick={recommendForMe}>
              🔮 Recommend For Me
            </button>

            {recommendMode && (
              <button className="showAllBtn" onClick={showAll}>
                Show All
              </button>
            )}
          </div>
        )}

        {/* INTERNSHIPS */}
        {activeTab === "INTERNSHIPS" && (
          <>
            <h2>
              {recommendMode
                ? "Recommended Internships"
                : "All Internships"}
            </h2>

            <div className="grid">
              {internshipList.length === 0 && (
                <p>No internships found</p>
              )}

              {internshipList.map(i => (
                <InternshipCard key={i.id} data={i} />
              ))}
            </div>
          </>
        )}

        {/* PROJECTS */}
        {activeTab === "PROJECTS" && (
          <>
            <h2>
              {recommendMode
                ? "Recommended Projects"
                : "All Projects"}
            </h2>

            <div className="grid">
              {projectList.length === 0 && (
                <p>No projects found</p>
              )}

              {projectList.map(p => (
                <ProjectCard key={p.id} data={p} />
              ))}
            </div>
          </>
        )}

        {/* APPLIED INTERNSHIPS */}
        {activeTab === "APPLIED" && (
          <UserAppliedInternships />
        )}
      </div>

      {/* PROFILE PANEL */}
      <div className={`profilePanel ${showProfile ? "open" : ""}`}>
        {showProfile && (
          <UserProfile
            userId={userId}
            onClose={() => setShowProfile(false)}
          />
        )}
      </div>

      {/* USER ICON */}
      {!showProfile && (
        <div
          className="userIcon"
          onClick={() => setShowProfile(true)}
          title="Profile"
        >
          👤
        </div>
      )}
    </div>
  );
}
