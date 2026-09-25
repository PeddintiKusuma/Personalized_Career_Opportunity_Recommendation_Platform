package com.smartinternship.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.smartinternship.backend.dto.ProjectRecommendationDTO;
import com.smartinternship.backend.service.ProjectRecommendationService;

@RestController
@RequestMapping("/api/project-recommendations")
@CrossOrigin("*")
public class ProjectRecommendationController {

    private final ProjectRecommendationService service;

    public ProjectRecommendationController(ProjectRecommendationService service) {
        this.service = service;
    }

    @GetMapping("/{studentId}")
    public List<ProjectRecommendationDTO> recommend(@PathVariable Long studentId) {
        return service.recommendProjects(studentId);
    }
}
