package com.example.reviewservice.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name="reviews")
public class ReviewEntity implements Serializable{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long reviewId;

    @Column(nullable = false, length = 40)
    private String userId;

    @Column(nullable = false)
    private Integer orderType;

    @Column
    private Long productId;

    @Column
    private String image;

    @Column
    private Long pkgId;

    @Column(nullable = false, length = 300)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer rating;

    @Column(updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;
}
