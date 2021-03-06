package com.example.reviewservice.vo;

import lombok.Data;

@Data
public class RequestReview {
    private Long reviewId;
    private String userId;
    private Long productId;
    private Long pkgId;
    private String pkgName;
    private String productName;
    private String image;
    private Integer orderType;
    private String title;
    private String content;
    private Integer rating;
}
