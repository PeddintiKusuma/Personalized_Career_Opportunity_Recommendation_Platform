# Personalized Career Opportunity Recommendation Platform

A full-stack academic web application that matches students with internships and projects using their skills, lets them apply on the platform, and gives administrators a workspace to manage opportunities and applications.


## Problem

Students often browse internships that do not match their skills. This platform personalizes discovery, supports direct applications, and keeps review in one admin dashboard. Extra student tools (skill gap, resume scan, saved list, prep checklist, free learning links) run locally or against free public sites—no paid APIs.

## Features

**Public**
- Home page (how it works, features, FAQ)
- Student signup / login, admin login
- Email verification via on-site token (no mail subscription)
- Free learning library (MDN, freeCodeCamp, CS50, Kaggle Learn, and similar)

**Student**
- Skill-based internship and project recommendations
- Browse, search, filter, save, and apply to internships
- Application tracking, private notes, CSV export
- Profile (skills and interests)
- Skill-gap analysis with free tutorial links
- In-browser resume skill scan
- Application prep checklist

**Admin**
- Overview counts and application-status snapshot
- Add / delete internships and projects
- Accept or reject applications
- View registered students

## Tech stack

| Layer | Choice |
| --- | --- |
| Frontend | React 18, React Router, Vite, HTML, CSS, JavaScript |
| Backend | Java 17, Spring Boot 3.2, Spring Web, Spring Data JPA |
| Database | MySQL |
| Build | Maven (backend), npm (frontend) |
| Version control | Git / GitHub |

## Project structure

```
Personalized_Career_Opportunity_Recommendation_Platform
├── frontend/                 React (Vite) app — port 3000
│   └── src/
│       ├── components/
│       ├── pages/            public, student, admin
│       ├── services/         API + localStorage helpers
│       └── data/             skill catalog and free learning links
├── backend/                  Spring Boot app — port 8080
│   └── src/main/java/com/smartinternship/backend/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── model/
│       ├── dto/
│       └── config/
├── docs/
│   └── PROJECT_DOCUMENTATION.md
└── README.md
```

## Setup

### 1. Clone

```bash
git clone https://github.com/PeddintiKusuma/Personalized_Career_Opportunity_Recommendation_Platform.git
cd Personalized_Career_Opportunity_Recommendation_Platform
```

### 2. Database

Create a MySQL database, then edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Tables are created/updated by Hibernate on startup. Sample internships, projects, and an admin user are seeded if the tables are empty.

### 3. Backend

Requires **JDK 17** and **Maven**.

```bash
cd backend
mvn spring-boot:run
```

API base: `http://localhost:8080/api`

### 4. Frontend

Requires **Node.js**.

```bash
cd frontend
npm install
npm start
```

UI: `http://localhost:3000`

## Demo accounts

Login details are stored in **MySQL**, in the `student` table (email, password, role, skills). After login, the browser only keeps a session copy in `localStorage` (id, name, email, role)—not used as the source of truth for passwords.

| Role | Email | Password |
| --- | --- | --- |
| Student (seeded, already verified) | `student@gmail.com` | `student123` |
| Admin (seeded) | `admin@gmail.com` | `admin123` |

## Workflow

1. Student registers and verifies with the token shown after signup.
2. Student adds skills (profile or resume scan).
3. Backend scores internships/projects against those skills.
4. Student applies; status starts as `APPLIED`.
5. Admin accepts or rejects; student sees the update.

## Author

**Peddinti Kusuma**  
B.Tech CSE – Institute of Aeronautical Engineering  
GitHub: [https://github.com/PeddintiKusuma](https://github.com/PeddintiKusuma)

## License

Academic / learning project.
