package com.smartinternship.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartinternship.backend.dto.InternshipRecommendationDTO;
import com.smartinternship.backend.service.RecommendationService;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/{studentId}")
    public List<InternshipRecommendationDTO> recommend(@PathVariable Long studentId) {
        return recommendationService.recommendInternships(studentId);
    }
}
