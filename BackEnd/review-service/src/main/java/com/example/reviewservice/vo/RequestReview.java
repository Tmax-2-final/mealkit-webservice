package com.example.reviewservice.vo;

import lombok.Data;

@Data
public class RequestReview {
    private String title;
    private String content;
    private Integer rating;
}
