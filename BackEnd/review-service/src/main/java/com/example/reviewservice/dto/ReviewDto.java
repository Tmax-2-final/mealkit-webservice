package com.example.reviewservice.dto;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.io.Serializable;
import java.util.Date;

@Data
public class ReviewDto implements Serializable {

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
    private Date createdAt;
    private Date modifiedAt;
}
