package com.smartinternship.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartinternship.backend.dto.ProjectRecommendationDTO;
import com.smartinternship.backend.model.Student;
import com.smartinternship.backend.repository.ProjectRepository;
import com.smartinternship.backend.repository.StudentRepository;
import com.smartinternship.backend.service.ProjectRecommendationService;

@Service
public class ProjectRecommendationServiceImpl implements ProjectRecommendationService {

    private final StudentRepository studentRepository;
    private final ProjectRepository projectRepository;

    public ProjectRecommendationServiceImpl(StudentRepository studentRepository,
                                            ProjectRepository projectRepository) {
        this.studentRepository = studentRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    
    public List<ProjectRecommendationDTO> recommendProjects(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        String skillText = student.getSkills() == null ? "" : student.getSkills();
        String[] skills = skillText.toLowerCase().split(",");

        return projectRepository.findAll()
                .stream()
                .map(project -> {

                    int score = 0;

                    String title = project.getTitle().toLowerCase();
                    String domain = project.getDomain().toLowerCase();
                    String tech = project.getTechStack().toLowerCase();

                    for (String skill : skills) {
                        skill = skill.trim();

                        if (tech.contains(skill)) score += 2;
                        if (title.contains(skill)) score += 1;
                        if (domain.contains(skill)) score += 1;
                    }

                    return new ProjectRecommendationDTO(project, score);
                })
                .filter(dto -> dto.getScore() > 0)
                .sorted((a, b) -> b.getScore() - a.getScore())
                .limit(3)
                .toList();
    }

}
