package com.smartinternship.backend.dto;

public class CombinedRecommendationDTO {

    private String type; // INTERNSHIP or PROJECT
    private Object item;
    private int score;

    public CombinedRecommendationDTO(String type, Object item, int score) {
        this.type = type;
        this.item = item;
        this.score = score;
    }

    public String getType() { return type; }
    public Object getItem() { return item; }
    public int getScore() { return score; }
}
