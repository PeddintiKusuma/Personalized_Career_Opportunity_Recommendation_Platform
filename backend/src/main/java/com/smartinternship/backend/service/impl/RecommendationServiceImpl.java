package com.smartinternship.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartinternship.backend.dto.InternshipRecommendationDTO;
import com.smartinternship.backend.model.Student;
import com.smartinternship.backend.repository.InternshipRepository;
import com.smartinternship.backend.repository.StudentRepository;
import com.smartinternship.backend.service.RecommendationService;

@Service
public class RecommendationServiceImpl implements RecommendationService {

    private final StudentRepository studentRepository;
    private final InternshipRepository internshipRepository;

    public RecommendationServiceImpl(StudentRepository studentRepository,
                                     InternshipRepository internshipRepository) {
        this.studentRepository = studentRepository;
        this.internshipRepository = internshipRepository;
    }
    
    private boolean skillMatchesInternship(String skill, String internshipText) {

        skill = skill.trim().toLowerCase();

        if (skill.equals("java") || skill.equals("spring")) {
            return internshipText.contains("backend");
        }

        if (skill.equals("javascript") || skill.equals("react")) {
            return internshipText.contains("frontend");
        }

        if (skill.equals("python")) {
            return internshipText.contains("data");
        }

        if (skill.equals("sql")) {
            return internshipText.contains("database");
        }

        return internshipText.contains(skill); // fallback
    }

    
    @Override
    public List<InternshipRecommendationDTO> recommendInternships(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String skillText = student.getSkills() == null ? "" : student.getSkills();
        String[] skills = skillText.toLowerCase().split(",");

        return internshipRepository.findAll()
                .stream()
                .map(internship -> {
                    int score = 0;

                    String searchableText =
                            (internship.getTitle() + " " +
                             internship.getCompany() + " " +
                             internship.getLocation())
                            .toLowerCase();

                    for (String skill : skills) {
                        if (skillMatchesInternship(skill, searchableText)) {
                            score++;
                        }
                    }

                    return new InternshipRecommendationDTO(internship, score);
                })
                .filter(dto -> dto.getScore() > 0)
                .sorted((a, b) -> b.getScore() - a.getScore())
                .limit(3)
                .toList();
    }
}
