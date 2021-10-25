package com.example.reviewservice.service;

import com.example.reviewservice.dto.ReviewDto;
import com.example.reviewservice.entity.ReviewEntity;
import com.example.reviewservice.vo.RequestDate;

public interface ReviewService {
    /* 전체 리뷰 조회 */
    Iterable<ReviewEntity> getAllReviews();

    /* 특정 회원의 리뷰 조회 */
    Iterable<ReviewEntity> getReviewsByUserId(String userId);

    /* 특정 회원의 리뷰 삭제 */
    void deleteReview(String userId ,Long reviewId);

    /* 리뷰 생성 */
    ReviewDto createReview(ReviewDto reviewDto, String userId, Long productId, Long pkgId, Integer orderType);

    /* 특정 회원의 리뷰 수정 */
    void updateReview(ReviewDto reviewDto, String userId, Long reviewId);

    /* 날짜 리뷰 조회 */
    Iterable<ReviewEntity> getReviewsAllBetween(RequestDate requestDate);
}
