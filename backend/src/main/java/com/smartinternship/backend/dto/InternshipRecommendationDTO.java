package com.smartinternship.backend.dto;

import com.smartinternship.backend.model.Internship;

public class InternshipRecommendationDTO {

    private Internship internship;
    private int score;

    public InternshipRecommendationDTO(Internship internship, int score) {
        this.internship = internship;
        this.score = score;
    }

    public Internship getInternship() {
        return internship;
    }

    public int getScore() {
        return score;
    }
}
