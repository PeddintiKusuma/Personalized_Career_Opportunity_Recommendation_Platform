# Personalized Career Opportunity Recommendation Platform

## Interview Preparation Answers

The following answers are written in first person so that I can use them directly in an interview. They describe the implementation in this repository accurately, including the current scope and the improvements I would make in a production version.

## 1. Explain your project in detail. What is its main objective?

My project is a full-stack **Personalized Career Opportunity Recommendation Platform** for students. Its main objective is to help students discover internships and projects that are relevant to their skills and interests instead of making them search through a large number of unrelated listings.

The platform provides:

- Student signup, login, and email verification through an on-site verification token.
- A student profile containing skills and interests.
- Skill-based recommendations for internships and projects.
- Search, filtering, saving, and applying for internships.
- Application tracking, including `APPLIED`, `ACCEPTED`, and `REJECTED` statuses.
- Student support tools such as skill-gap analysis, resume skill scanning, a preparation checklist, and free learning resources.
- An admin dashboard for adding or deleting opportunities, reviewing applications, changing application statuses, and viewing registered students.

The project is not intended to replace a large commercial job portal. It is an academic full-stack application that demonstrates how a focused recommendation workflow can connect students, opportunities, and administrators in one system.

## 2. What problem does your project solve, and why did you choose this project?

Students often spend a lot of time browsing internships that do not match their technical skills, career interests, or experience level. Even after finding an opportunity, they may use a separate system to apply and have no central place to track the result. This creates information overload and makes the career preparation process less organized.

My platform solves this problem by:

1. Storing the student's skills and interests in a profile.
2. Comparing those skills with opportunity and project information.
3. Showing the most relevant results first.
4. Allowing the student to apply from the same platform.
5. Allowing the student to track the application status.
6. Giving administrators one place to manage opportunities and applications.

I chose this project because it addresses a practical problem faced by students and allowed me to combine frontend development, backend API design, database modeling, authentication, and recommendation logic in one real-world workflow. I also wanted to build something more meaningful than a simple CRUD application: the CRUD features support a complete user journey from profile creation to recommendation and application review.

## 3. What was your role, and what exactly did you implement?

I worked as the end-to-end full-stack developer for the project. I was responsible for the overall design and implementation rather than only one isolated module.

My work included:

- Designing the user flows for public users, students, and administrators.
- Creating the React pages and reusable components for authentication, dashboards, opportunity lists, profiles, applications, and admin screens.
- Configuring React Router and protected routes for student and admin areas.
- Creating the Spring Boot project and organizing it into controllers, services, repositories, models, DTOs, and configuration.
- Implementing REST APIs for authentication, verification, students, internships, projects, recommendations, and applications.
- Designing the MySQL-backed JPA entities and repository queries.
- Implementing the skill-based recommendation logic.
- Implementing duplicate-application checking and application status updates.
- Adding seed data for demo internships, projects, a student, and an admin.
- Adding CORS configuration so that the React development server can call the backend.
- Implementing frontend error parsing and user-facing request errors.
- Testing the complete flow from signup and verification to applying and admin review.

My main contribution was integrating these parts into one working product, not just creating separate screens or APIs.

## 4. Explain your project architecture and the complete workflow from frontend to backend and database.

The project uses a three-layer web architecture:

```text
React/Vite frontend
        |
        | HTTP/JSON REST calls
        v
Spring Boot REST backend
        |
        | Spring Data JPA / Hibernate
        v
MySQL database
```

### Frontend

The frontend is a React 18 application built with Vite. React Router separates public pages from student and admin pages. The frontend has:

- Public pages such as Home, Login, Signup, Email Verification, and Resources.
- Student pages such as Dashboard, Internships, Projects, Applications, Profile, Saved Opportunities, Skill Gap, Resume Scanner, and Prep Checklist.
- Admin pages such as Admin Dashboard, Internships, Projects, Applications, and Students.
- Shared components such as the sidebar, opportunity cards, protected route, and layouts.
- A service layer that sends `GET`, `POST`, `PUT`, and `DELETE` requests to the backend.

### Backend

The backend is a Java 17 Spring Boot application. Its main layers are:

- **Controllers:** Receive HTTP requests and return JSON responses.
- **Services:** Contain business rules such as recommendations and application processing.
- **Repositories:** Use Spring Data JPA to read and write entities.
- **Models/entities:** Represent students, internships, projects, and applications.
- **DTOs:** Shape recommendation and authentication responses without exposing every entity field.
- **Configuration:** Handles CORS and startup seed data.

### Complete request workflow

For example, when a student views recommendations:

1. The student logs in through the React login page.
2. React calls `POST /api/auth/login` with the email and password.
3. `AuthController` validates the input, looks up the student using `StudentRepository`, and returns the student ID, role, verification state, and basic profile information.
4. The frontend stores this limited session information in browser `localStorage` and uses `ProtectedRoute` to control which screens can be opened.
5. The student dashboard requests recommendations from an endpoint under `/api/recommendations`.
6. The recommendation controller passes the student ID to the recommendation service.
7. The service loads the student's skills and the available internships/projects through JPA repositories.
8. The service compares the normalized skill text with the searchable opportunity text, calculates a score, sorts the results, and limits the response to the highest-scoring results.
9. Spring/Jackson serializes the result as JSON.
10. The frontend receives the JSON, unwraps the recommendation DTO where necessary, and renders the cards.

When the student applies:

1. React sends a request to `POST /api/applications` with `studentId` and `internshipId`.
2. The application service checks whether the same student has already applied to that internship.
3. It loads both related records from MySQL.
4. It creates an `Application` with status `APPLIED`.
5. JPA saves the application and returns the saved record.
6. The student can later retrieve applications through `GET /api/applications/student/{studentId}`.
7. An administrator can update a status through `PUT /api/applications/{id}/status`.

## 5. Why did you choose Java, Spring Boot, React, and MySQL?

### Java

I chose Java because it is strongly typed, object-oriented, widely used in enterprise development, and suitable for building maintainable backend systems. Java's type system helped me keep the domain models, services, and API contracts organized.

### Spring Boot

Spring Boot reduces the configuration required to create a Java web application. Spring Web provides REST controllers, Spring Data JPA simplifies database access, and dependency injection keeps controllers and services loosely coupled. This made it easier to separate the API layer from the business logic and persistence layer.

### React

I chose React because the application has many interactive screens and reusable UI patterns. Components such as opportunity cards, protected routes, dashboards, and forms can be reused and updated without reloading the whole page. React Router also makes the public, student, and admin navigation clear.

### MySQL

MySQL is a good fit because the project data is relational. Students apply to internships, and applications must refer to existing students and opportunities. MySQL provides reliable primary keys, foreign-key-style relationships through JPA mappings, filtering, and persistence. It is also widely used, easy to set up locally, and appropriate for an academic project.

Together, these technologies gave me a clear separation between the user interface, business logic, and relational data.

## 6. How did you design and implement REST APIs? How does the frontend communicate with the backend?

I designed the API around resources and actions. The main endpoint groups are:

| Area | Example endpoints | Purpose |
| --- | --- | --- |
| Authentication | `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/verify/{token}` | Create accounts, log in, and verify accounts |
| Students | `GET /api/students`, `GET /api/students/{id}`, `PUT /api/students/{id}` | Read and update student profiles |
| Internships | `GET /api/internships`, `POST /api/internships`, `DELETE /api/internships/{id}` | Browse and manage internships |
| Projects | `GET /api/projects`, `POST /api/projects`, `DELETE /api/projects/{id}` | Browse and manage projects |
| Recommendations | `GET /api/recommendations/{studentId}`, `GET /api/project-recommendations/{studentId}`, `GET /api/recommendations/all/{studentId}` | Return scored recommendations |
| Applications | `POST /api/applications`, `GET /api/applications/student/{studentId}`, `GET /api/applications`, `PUT /api/applications/{id}/status` | Apply and manage application status |

The frontend has a shared API service. It builds the request URL from the backend base URL, sends JSON using the browser `fetch` API, parses JSON or text responses, and converts non-success responses into JavaScript errors. React pages call these functions inside event handlers or effects, update component state, and display the results.

The backend uses `ResponseEntity` where it needs explicit HTTP status codes. For example:

- `201 Created` after signup.
- `400 Bad Request` for missing or invalid input.
- `401 Unauthorized` for invalid credentials.
- `404 Not Found` when a requested record does not exist.
- `409 Conflict` when an email is already registered.

During local development, the backend allows requests from the React development origins `http://localhost:3000` and `http://localhost:5173` through CORS configuration.

## 7. Explain your database design. What tables did you use, and how are they related?

The active JPA model creates four main application tables:

### `student`

This table stores:

- `id`
- `name`
- `email`
- `password`
- `skills`
- `interests`
- `role`
- `verified`
- `verification_token`

The `role` value distinguishes `STUDENT` and `ADMIN`. Skills and interests are stored as comma-separated text in the current academic implementation.

### `internship`

This table stores:

- `id`
- `title`
- `company`
- `location`
- `duration`
- `required_skills`

### `project`

This table stores:

- `id`
- `title`
- `domain`
- `tech_stack`
- `description`

### `application`

This table stores:

- `id`
- `student_id`
- `internship_id`
- `status`

`Application` has two `ManyToOne` relationships:

```text
Student 1 ---- many Application many ---- 1 Internship
```

This means one student can submit many applications, and one internship can receive applications from many students. The application table acts as the relationship record and also stores the current status.

Projects are currently recommended and managed independently; the current application flow is for internships. Hibernate creates or updates the schema using `spring.jpa.hibernate.ddl-auto=update`, and `DataLoader` inserts sample records when the relevant tables are empty.

## 8. What was the biggest technical challenge, and how did you solve it?

The biggest challenge was connecting the recommendation logic with the complete application lifecycle. It was not enough to display internships: the system had to understand a student's skills, rank relevant opportunities, prevent duplicate applications, and allow an administrator to review applications.

I solved it by:

1. Storing skills as normalized, comma-separated profile data.
2. Converting both student skills and opportunity text to lowercase before comparison.
3. Comparing each skill against relevant internship or project text.
4. Incrementing a score for every matching skill.
5. Sorting recommendations by score and returning only the most relevant results.
6. Moving this logic into dedicated Spring services instead of putting it in controllers.
7. Checking `findByStudentIdAndInternshipId` before creating an application.
8. Representing the application lifecycle with clear statuses: `APPLIED`, `ACCEPTED`, and `REJECTED`.

This gave the project a useful baseline recommendation system without requiring a paid external API or a machine-learning model.

## 9. How did you implement authentication, authorization, and error handling?

### Authentication

The backend provides signup, login, and verification endpoints. During signup it validates required fields, restricts the email format to Gmail addresses for this project, checks for duplicate emails, creates a verification token, and saves the student. The user verifies the account using the token returned by the signup flow. Login checks the stored email and password and returns basic session information.

### Authorization

The application has two roles: `STUDENT` and `ADMIN`. The backend includes the role in the authentication response. The React `ProtectedRoute` checks whether a session exists and whether the requested page matches the session role. It also redirects unverified students to the verification page. Student pages and admin pages therefore have separate route access rules in the frontend.

The current project uses a lightweight academic authentication approach: it stores only the session copy (`studentId`, name, email, role, and verification state) in `localStorage`, not the password. It does not yet use JWT, Spring Security, refresh tokens, or password hashing. I would not describe it as production-grade authentication.

### Error handling

The controllers return explicit validation and HTTP responses for common errors such as missing fields, invalid email format, duplicate accounts, invalid credentials, missing verification tokens, and missing records. The service layer throws meaningful errors for cases such as duplicate applications or missing students/internships. The frontend parses the response body and displays the backend's message when a request fails.

For a production release, I would add a global Spring exception handler, request DTO validation, password hashing with BCrypt, Spring Security, server-side authorization checks, and a consistent error response format.

## 10. What are the project's limitations, what improvements would you make, and what did you learn?

### Limitations

- The recommendation engine uses keyword matching and a simple score rather than machine learning or semantic similarity.
- Skills, interests, and technology stacks are stored as text instead of normalized many-to-many tables.
- The current authentication is not production-ready: passwords should be hashed and requests should be authorized on the server.
- The browser session is stored in `localStorage`, so it should not be treated as a secure token store for a production application.
- The current application endpoint accepts IDs from the client and does not independently verify the caller's role or ownership on every request.
- The verification token is shown through the application flow instead of being sent through a real email service.
- Validation and exception handling can be made more centralized.
- The current application relationship is implemented for internships; projects do not yet have the same application workflow.
- There are no notification, email reminder, or advanced analytics services.

### Improvements

If I continued the project, I would:

1. Add Spring Security with BCrypt password hashing, JWT or secure server-side sessions, refresh-token handling, and server-side role checks.
2. Add a global exception handler and Bean Validation DTOs.
3. Normalize skills into separate `Skill`, `StudentSkill`, and opportunity-skill relationships.
4. Improve recommendation ranking using weighted skills, interests, location, duration, experience level, and eventually embeddings or a machine-learning model.
5. Add a real email provider for verification and application notifications.
6. Add pagination, database indexes, and better filtering for larger datasets.
7. Add project applications if that is part of the product requirements.
8. Add automated unit, integration, API, and frontend tests.
9. Add audit logs and analytics for administrator actions and recommendation quality.
10. Deploy the frontend, backend, and database with environment-specific configuration and secret management.

### What I learned

I learned how to take a product idea through the full development cycle: requirements, database modeling, REST API design, frontend integration, validation, user flows, and testing. I also learned that a feature is not complete when only its screen works; the frontend, backend, database relationships, permissions, error paths, and user feedback all need to work together.

## 11. What problems and struggles did you face while building the website, and how did you solve them?

### Connecting the frontend and backend

At first, the frontend and backend had to agree on request paths, ports, JSON shapes, query parameters, and error messages. Small differences could cause a page to load but fail during an action.

I solved this by centralizing API calls in a frontend service, using consistent endpoint names, keeping the backend controllers organized by resource, and adding response parsing that handles both JSON and text errors. I tested the workflow one API at a time before connecting the complete page.

### Managing different student and admin flows

Student and admin users need different screens and permissions. Without a clear route structure, it would be easy for one role to open the wrong dashboard.

I solved this with separate React route groups and a reusable `ProtectedRoute` component. The component checks the saved role and redirects the user to the correct dashboard. I also used separate admin and student navigation layouts.

### Designing a useful recommendation approach

I did not want to depend on a paid recommendation service, and a full machine-learning solution would have been too large for the project scope. A simple exact keyword match also produced weak results if it was implemented carelessly.

I solved the initial problem with a deterministic scoring algorithm: normalize the text, compare each profile skill with the opportunity text, assign one point for each match, sort by score, and limit the result count. I also added a few domain mappings such as Java/Spring to backend, React/JavaScript to frontend, Python to data, and SQL to database. This made the result understandable and easy to debug while leaving room for a future AI-based ranking system.

### Preventing duplicate applications

Students should not be able to submit the same application repeatedly. This is a business-rule problem, not only a frontend button problem, because a user can send requests outside the UI.

I solved it in the backend service by checking the student and internship pair before saving. If an existing application is found, the service returns an error instead of creating another record. This keeps the rule close to the data operation.

### Handling verification without a paid email service

For an academic project, configuring a real mail provider would add cost and deployment complexity. However, I still wanted the signup flow to include account verification.

I generated a verification token on the backend and returned it as part of the signup response so the user can complete verification in the application. This demonstrates the verification workflow while remaining free and locally testable. In a production system, I would send a time-limited token through an email provider and avoid exposing it directly in the response.

### Working with data consistency and missing records

Requests can contain invalid IDs, missing fields, duplicate emails, or records that have already been deleted. These cases can otherwise become confusing runtime failures.

I addressed this by validating required authentication fields, checking duplicate emails, using repository lookups that handle absent records, returning appropriate HTTP statuses where the controller handles the case, and showing the backend error message in the frontend. I would improve this further with centralized exception handling and Bean Validation.

### Keeping the project practical and within scope

The platform includes many useful ideas, but implementing every feature at production scale would make the project too large. I therefore separated the core workflow from optional support tools. The essential path is profile -> recommendation -> application -> admin review. Features such as resume scanning, saved opportunities, preparation checklists, and free resources add value without blocking that core path.

This prioritization helped me finish a complete, demonstrable product while keeping future enhancements clearly identified.

## Short closing answer

Overall, this project demonstrates my ability to build and explain a complete full-stack application. I worked across React, Spring Boot, REST APIs, JPA, MySQL, authentication flows, recommendation logic, role-based frontend routing, and application management. The most important lesson was to design around the complete user workflow and to be honest about the difference between an academic prototype and a production-ready system.
