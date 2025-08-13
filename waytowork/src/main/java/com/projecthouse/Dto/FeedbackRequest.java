package com.projecthouse.Dto;

import lombok.Data;

@Data
public class FeedbackRequest {
    private String feedback;
    private Integer rating; // rating out of 5
}
