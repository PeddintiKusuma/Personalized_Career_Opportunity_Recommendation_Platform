package com.smartinternship.backend.service;

import java.util.List;
import com.smartinternship.backend.dto.ProjectRecommendationDTO;

public interface ProjectRecommendationService {
    List<ProjectRecommendationDTO> recommendProjects(Long studentId);
}
