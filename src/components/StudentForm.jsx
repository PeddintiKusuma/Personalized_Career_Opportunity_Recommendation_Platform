import React, { useState } from "react";
import API from "../services/api";
import { SiTensorflow } from "react-icons/si";
import { AiOutlineRobot } from "react-icons/ai";


// 🔹 Official icons
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaJava,
  FaPython,
  FaNodeJs,
  FaDatabase
} from "react-icons/fa";

import { SiSpring, SiMongodb, SiMysql } from "react-icons/si";

// 🔹 Skill → Official Icon mapping
const SKILL_ICONS = {
  html: <FaHtml5 color="#E34F26" />,
  css: <FaCss3Alt color="#1572B6" />,
  javascript: <FaJs color="#F7DF1E" />,
  js: <FaJs color="#F7DF1E" />,
  react: <FaReact color="#61DAFB" />,
  java: <FaJava color="#007396" />,
  spring: <SiSpring color="#6DB33F" />,
  python: <FaPython color="#3776AB" />,
  node: <FaNodeJs color="#339933" />,
  mongodb: <SiMongodb color="#47A248" />,
  mysql: <SiMysql color="#4479A1" />,

  // 🔥 Machine Learning icons
  "machine learning": <SiTensorflow color="#FF6F00" />,
  ml: <SiTensorflow color="#FF6F00" />,
  ai: <AiOutlineRobot color="#6B7280" />,
  "artificial intelligence": <AiOutlineRobot color="#6B7280" />
};
function StudentForm({ onStudentAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();

      const skill = skillInput.trim().toLowerCase();
      if (!skills.includes(skill)) {
        setSkills([...skills, skill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const submit = async () => {
    if (!name || !email || skills.length === 0) return;

    const student = await API.post("/students", {
      name,
      email,
      skills: skills.join(",")
    });

    onStudentAdded(student);

    setName("");
    setEmail("");
    setSkills([]);
    setSkillInput("");
  };

  return (
    <div className="card student-form">
      <h2>👩‍🎓 Check Internship and Projects</h2>

      <div className="form-group">
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Skills</label>

        <input
          className="skill-input"
          value={skillInput}
          placeholder="Type skill and press Enter"
          onChange={e => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* 🔥 Official logo chips */}
        <div className="chip-list">
          {skills.map(skill => (
            <div key={skill} className="chip">
              <span className="chip-icon">
                {SKILL_ICONS[skill] || <FaDatabase />}
              </span>
              <span className="chip-text">{skill}</span>
              <span
                className="chip-close"
                onClick={() => removeSkill(skill)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="submit-btn" onClick={submit}>
        Check Internship
      </button>
    </div>
  );
}

export default StudentForm;
