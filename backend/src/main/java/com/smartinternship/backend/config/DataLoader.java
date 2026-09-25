package com.smartinternship.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.smartinternship.backend.model.Internship;
import com.smartinternship.backend.model.Project;
import com.smartinternship.backend.model.Student;
import com.smartinternship.backend.repository.InternshipRepository;
import com.smartinternship.backend.repository.ProjectRepository;
import com.smartinternship.backend.repository.StudentRepository;

@Component
public class DataLoader implements CommandLineRunner {

    private final InternshipRepository internshipRepository;
    private final ProjectRepository projectRepository;
    private final StudentRepository studentRepository;

    public DataLoader(InternshipRepository internshipRepository,
                      ProjectRepository projectRepository,
                      StudentRepository studentRepository) {
        this.internshipRepository = internshipRepository;
        this.projectRepository = projectRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(String... args) {
        if (internshipRepository.count() == 0) {
            internshipRepository.save(new Internship("Backend Intern", "Infosys", "Hyderabad", "3 months", "java,spring"));
            internshipRepository.save(new Internship("Frontend Intern", "TCS", "Bangalore", "6 months", "javascript,react"));
            internshipRepository.save(new Internship("Data Science Intern", "Amazon", "Chennai", "3 months", "python,sql"));
        }

        if (projectRepository.count() == 0) {
            Project p1 = new Project();
            p1.setTitle("Campus Placement Portal");
            p1.setDomain("Web Development");
            p1.setTechStack("java,spring,react");
            p1.setDescription("A portal that matches students with internships using skill profiles.");
            projectRepository.save(p1);

            Project p2 = new Project();
            p2.setTitle("Resume Skill Extractor");
            p2.setDomain("Data Science");
            p2.setTechStack("python,nlp");
            p2.setDescription("Extract skills from resumes and suggest matching opportunities.");
            projectRepository.save(p2);

            Project p3 = new Project();
            p3.setTitle("Student Dashboard UI Kit");
            p3.setDomain("Frontend");
            p3.setTechStack("javascript,react,css");
            p3.setDescription("Reusable dashboard components for academic career platforms.");
            projectRepository.save(p3);
        }

        if (studentRepository.findByEmail("admin@gmail.com").isEmpty()) {
            Student admin = new Student();
            admin.setName("Platform Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword("admin123");
            admin.setRole("ADMIN");
            admin.setVerified(true);
            admin.setSkills("management");
            admin.setInterests("operations");
            studentRepository.save(admin);
        }

        if (studentRepository.findByEmail("student@gmail.com").isEmpty()) {
            Student student = new Student();
            student.setName("Demo Student");
            student.setEmail("student@gmail.com");
            student.setPassword("student123");
            student.setRole("STUDENT");
            student.setVerified(true);
            student.setSkills("java,react,python");
            student.setInterests("web development");
            studentRepository.save(student);
        }
    }
}
