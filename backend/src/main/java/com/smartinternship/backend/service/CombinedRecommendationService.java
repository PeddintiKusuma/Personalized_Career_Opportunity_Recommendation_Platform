package com.smartinternship.backend.service;

import java.util.List;
import com.smartinternship.backend.dto.CombinedRecommendationDTO;

public interface CombinedRecommendationService {
    List<CombinedRecommendationDTO> recommendAll(Long studentId);
}
