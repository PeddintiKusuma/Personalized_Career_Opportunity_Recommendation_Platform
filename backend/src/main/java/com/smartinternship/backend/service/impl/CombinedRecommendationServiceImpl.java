package com.smartinternship.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartinternship.backend.dto.CombinedRecommendationDTO;
import com.smartinternship.backend.model.Internship;
import com.smartinternship.backend.model.Project;
import com.smartinternship.backend.model.Student;
import com.smartinternship.backend.repository.InternshipRepository;
import com.smartinternship.backend.repository.ProjectRepository;
import com.smartinternship.backend.repository.StudentRepository;
import com.smartinternship.backend.service.CombinedRecommendationService;

@Service
public class CombinedRecommendationServiceImpl implements CombinedRecommendationService {

    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;
    private final ProjectRepository projectRepository;

    public CombinedRecommendationServiceImpl(StudentRepository studentRepository,
                                             InternshipRepository internshipRepository,
                                             ProjectRepository projectRepository) {
        this.studentRepository = studentRepository;
        this.internshipRepository = internshipRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public List<CombinedRecommendationDTO> recommendAll(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String skillText = student.getSkills() == null ? "" : student.getSkills();
        String[] skills = skillText.toLowerCase().split(",");

        List<CombinedRecommendationDTO> results = new ArrayList<>();

        /* ================= INTERNSHIPS ================= */
        for (Internship internship : internshipRepository.findAll()) {

            int score = 0;
            String text = (
                    internship.getTitle() + " " +
                    internship.getCompany() + " " +
                    internship.getLocation()
            ).toLowerCase();

            for (String skill : skills) {
                if (text.contains(skill.trim())) {
                    score++;
                }
            }

            if (score > 0) {
                results.add(new CombinedRecommendationDTO(
                        "INTERNSHIP", internship, score
                ));
            }
        }

        /* ================= PROJECTS ================= */
        for (Project project : projectRepository.findAll()) {

            int score = 0;
            String text = (
                    project.getTitle() + " " +
                    project.getDomain() + " " +
                    project.getTechStack()
            ).toLowerCase();

            for (String skill : skills) {
                if (text.contains(skill.trim())) {
                    score++;
                }
            }

            if (score > 0) {
                results.add(new CombinedRecommendationDTO(
                        "PROJECT", project, score
                ));
            }
        }

        return results.stream()
                .sorted((a, b) -> b.getScore() - a.getScore())
                .limit(5)
                .toList();
    }
}
