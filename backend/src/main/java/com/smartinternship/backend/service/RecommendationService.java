package com.smartinternship.backend.service;

import java.util.List;

import com.smartinternship.backend.dto.InternshipRecommendationDTO;

public interface RecommendationService {

    List<InternshipRecommendationDTO> recommendInternships(Long studentId);
}
