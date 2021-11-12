package com.example.reviewservice.service;

import com.example.reviewservice.dto.ReviewDto;
import com.example.reviewservice.entity.ReviewEntity;
import com.example.reviewservice.vo.RequestDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    /* 전체 리뷰 조회 */
    Iterable<ReviewEntity> getAllReviews();

    /* 특정 회원의 리뷰 조회 */
    Iterable<ReviewEntity> getReviewsByUserId(String userId);

    /* 특정 패키지별 리뷰 조회 */
    Iterable<ReviewEntity> getReviewsByPkgId(Long pkgId);

    /* 특정 상품별 리뷰 조회 */
    Iterable<ReviewEntity> getReviewsByProductId(Long productId);

    /* 특정 회원의 리뷰 삭제 */
    void deleteReview(String userId ,Long reviewId);

    /* 리뷰 생성 */
    ReviewDto createReview(ReviewDto reviewDto);

    /* 특정 회원의 리뷰 수정 */
    void updateReview(ReviewDto reviewDto, String userId, Long reviewId);

    /* 날짜 리뷰 조회 */
    Iterable<ReviewEntity> getReviewsAllBetween(RequestDate requestDate);

    /* 전체 리뷰 페이지 */
    Page<ReviewEntity> getAllPageReviews(Pageable pageRequest);

    /* 특정 회원의 리뷰 조회 */
    Page<ReviewEntity> getPageReviewsByUserId(String userId, Pageable pageRequest);

    /* 특정 패키지별 리뷰 조회 */
    Page<ReviewEntity> getPageReviewsByPkgId(Long pkgId, Pageable pageRequest);

    /* 특정 상품별 리뷰 조회 */
    Page<ReviewEntity> getPageReviewsByProductId(Long productId, Pageable pageRequest);

    /* 특정 회원의 패키지와 상품별 리뷰 조회 */
    Page<ReviewEntity> getReviewsByUserIdAndOrderType(String userId, Integer orderType, Pageable pageRequest);

}
