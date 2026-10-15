-- Personalized Career Opportunity Recommendation Platform
-- Run this script in MySQL before starting the Spring Boot backend.

CREATE DATABASE IF NOT EXISTS career_platform
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE career_platform;

CREATE TABLE IF NOT EXISTS student (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    skills VARCHAR(255),
    interests VARCHAR(255),
    role VARCHAR(255) NOT NULL,
    verified BIT(1) NOT NULL DEFAULT b'0',
    verification_token VARCHAR(64),
    PRIMARY KEY (id),
    UNIQUE KEY uk_student_email (email),
    UNIQUE KEY uk_student_verification_token (verification_token)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS internship (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    duration VARCHAR(255),
    required_skills VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS project (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255),
    domain VARCHAR(255),
    tech_stack VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS application (
    id BIGINT NOT NULL AUTO_INCREMENT,
    student_id BIGINT,
    internship_id BIGINT,
    status VARCHAR(255),
    PRIMARY KEY (id),
    CONSTRAINT fk_application_student
        FOREIGN KEY (student_id) REFERENCES student (id),
    CONSTRAINT fk_application_internship
        FOREIGN KEY (internship_id) REFERENCES internship (id),
    UNIQUE KEY uk_application_student_internship (student_id, internship_id)
) ENGINE=InnoDB;

-- Demo data. INSERT IGNORE keeps this script safe to run more than once.
INSERT IGNORE INTO student
    (name, email, password, skills, interests, role, verified, verification_token)
VALUES
    ('Platform Admin', 'admin@gmail.com', 'admin123', 'management', 'operations', 'ADMIN', b'1', NULL),
    ('Demo Student', 'student@gmail.com', 'student123', 'java,react,python', 'web development', 'STUDENT', b'1', NULL);

INSERT IGNORE INTO internship
    (title, company, location, duration, required_skills)
VALUES
    ('Backend Intern', 'Infosys', 'Hyderabad', '3 months', 'java,spring'),
    ('Frontend Intern', 'TCS', 'Bangalore', '6 months', 'javascript,react'),
    ('Data Science Intern', 'Amazon', 'Chennai', '3 months', 'python,sql');

INSERT IGNORE INTO project
    (title, domain, tech_stack, description)
VALUES
    ('Campus Placement Portal', 'Web Development', 'java,spring,react',
     'A portal that matches students with internships using skill profiles.'),
    ('Resume Skill Extractor', 'Data Science', 'python,nlp',
     'Extract skills from resumes and suggest matching opportunities.'),
    ('Student Dashboard UI Kit', 'Frontend', 'javascript,react,css',
     'Reusable dashboard components for academic career platforms.');

-- Useful verification queries:
-- SHOW TABLES;
-- SELECT * FROM student;
-- SELECT * FROM internship;
-- SELECT * FROM project;
-- SELECT * FROM application;
