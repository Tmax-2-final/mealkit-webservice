package com.example.reviewservice.jpa;

import com.example.reviewservice.entity.ReviewEntity;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface ReviewRepository extends CrudRepository<ReviewEntity, Long> {

    ReviewEntity findByReviewId(Long reviewId);
    ReviewEntity findAllByOrderTypeAndPkgId(Integer orderType, Long pkgId);
    ReviewEntity findAllByOrderTypeAndProductId(Integer orderType, Long productId);
    Iterable<ReviewEntity> findAllByUserId(String userId);
    Iterable<ReviewEntity> findAllByPkgId(Long pkgId);
    Iterable<ReviewEntity> findAllByProductId(Long productId);

    ReviewEntity findByUserIdAndReviewId(String userId, Long reviewId);

    @Transactional
    void deleteByUserIdAndReviewId(String userId, Long reviewId);


}