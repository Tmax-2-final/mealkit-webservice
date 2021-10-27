package com.example.reviewservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestDeleteReview {
    private Long reviewId;
    private String userId;
}
