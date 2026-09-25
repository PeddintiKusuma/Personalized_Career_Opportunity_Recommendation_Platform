package com.smartinternship.backend.dto;

import com.smartinternship.backend.model.Project;

public class ProjectRecommendationDTO {

    private Project project;
    private int score;

    public ProjectRecommendationDTO(Project project, int score) {
        this.project = project;
        this.score = score;
    }

    public Project getProject() {
        return project;
    }

    public int getScore() {
        return score;
    }
}
