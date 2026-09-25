package com.smartinternship.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.smartinternship.backend.dto.CombinedRecommendationDTO;
import com.smartinternship.backend.service.CombinedRecommendationService;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin("*")
public class CombinedRecommendationController {

    private final CombinedRecommendationService service;

    public CombinedRecommendationController(CombinedRecommendationService service) {
        this.service = service;
    }

    @GetMapping("/all/{studentId}")
    public List<CombinedRecommendationDTO> recommendAll(@PathVariable Long studentId) {
        return service.recommendAll(studentId);
    }
}
