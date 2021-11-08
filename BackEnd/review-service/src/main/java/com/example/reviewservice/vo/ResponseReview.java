package com.example.reviewservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseReview {
    private String title;
    private String content;
    private Integer rating;

    private Long reviewId;
    private Long pkgId;
    private Integer orderType;
    private Long productId;
    private String productName;
    private String pkgName;
    private String userId;
    private Date createdAt;
    private Date modifiedAt;
    private String image;
}
