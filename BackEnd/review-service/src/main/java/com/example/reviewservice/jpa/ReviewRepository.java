package com.example.reviewservice.jpa;

import com.example.reviewservice.entity.ReviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {

    ReviewEntity findByReviewId(Long reviewId);
    ReviewEntity findAllByOrderTypeAndPkgId(Integer orderType, Long pkgId);
    ReviewEntity findAllByOrderTypeAndProductId(Integer orderType, Long productId);
    Iterable<ReviewEntity> findAllByUserId(String userId);
    Iterable<ReviewEntity> findAllByPkgId(Long pkgId);
    Iterable<ReviewEntity> findAllByProductId(Long productId);

    ReviewEntity findByUserIdAndReviewId(String userId, Long reviewId);
    Page<ReviewEntity> findAllByUserIdAndOrderType(String userId, Integer orderType,  Pageable pageRequest);

    @Transactional
    void deleteByUserIdAndReviewId(String userId, Long reviewId);


    Page<ReviewEntity> findAllByUserId(String userId ,  Pageable pageRequest);
    Page<ReviewEntity> findAllByPkgId(Long pkgId,  Pageable pageRequest);
    Page<ReviewEntity> findAllByProductId(Long productId,  Pageable pageRequest);


}