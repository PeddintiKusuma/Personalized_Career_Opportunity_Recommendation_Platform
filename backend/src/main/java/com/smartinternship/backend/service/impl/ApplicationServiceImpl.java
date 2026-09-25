package com.smartinternship.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartinternship.backend.model.Application;
import com.smartinternship.backend.model.Internship;
import com.smartinternship.backend.model.Student;
import com.smartinternship.backend.repository.ApplicationRepository;
import com.smartinternship.backend.repository.InternshipRepository;
import com.smartinternship.backend.repository.StudentRepository;
import com.smartinternship.backend.service.ApplicationService;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  StudentRepository studentRepository,
                                  InternshipRepository internshipRepository) {
        this.applicationRepository = applicationRepository;
        this.studentRepository = studentRepository;
        this.internshipRepository = internshipRepository;
    }

    @Override
    
    public Application apply(Long studentId, Long internshipId) {

        // 🔒 Check duplicate application
        applicationRepository
            .findByStudentIdAndInternshipId(studentId, internshipId)
            .ifPresent(app -> {
                throw new RuntimeException("You have already applied to this internship");
            });

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        Application application = new Application();
        application.setStudent(student);
        application.setInternship(internship);
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }
    
    @Override
    public Application updateStatus(Long applicationId, String status) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status.toUpperCase());

        return applicationRepository.save(application);
    }



    @Override
    public List<Application> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
}
