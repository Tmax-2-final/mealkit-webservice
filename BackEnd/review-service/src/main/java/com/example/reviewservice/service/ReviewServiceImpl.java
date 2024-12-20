package com.example.reviewservice.service;

import com.example.reviewservice.dto.ReviewDto;
import com.example.reviewservice.entity.ReviewEntity;
import com.example.reviewservice.jpa.ReviewRepository;
import com.example.reviewservice.vo.RequestDate;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ReviewServiceImpl implements ReviewService {
    ReviewRepository reviewRepository;
    Environment env;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, Environment env) {
        this.reviewRepository = reviewRepository;
        this.env = env;
    }

    @Override
    public Iterable<ReviewEntity> getAllReviews(){
        return reviewRepository.findAll();
    }

    @Override
    public Iterable<ReviewEntity> getReviewsByUserId(String userId) {
        return reviewRepository.findAllByUserId(userId);
    }


    @Override
    public Iterable<ReviewEntity> getReviewsByPkgId(Long pkgId) {
        return reviewRepository.findAllByPkgId(pkgId);
    }

    @Override
    public Iterable<ReviewEntity> getReviewsByProductId(Long productId) {
        return reviewRepository.findAllByProductId(productId);
    }



    @Override
    public void deleteReview(String userId ,Long reviewId) {
        reviewRepository.deleteByUserIdAndReviewId(userId, reviewId);
    }

    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

//        reviewDto.setUserId(userId);
//        reviewDto.setProductId(productId);
//        reviewDto.setPkgId(pkgId);
//        reviewDto.setOrderType(orderType);

        ReviewEntity reviewEntity = mapper.map(reviewDto, ReviewEntity.class);

        reviewRepository.save(reviewEntity);

        return reviewDto;
    }


    @Override
    public void updateReview(ReviewDto reviewDto, String userId, Long reviewId) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        ReviewEntity reviewEntity = reviewRepository.findByUserIdAndReviewId(userId, reviewId);

        reviewEntity.setTitle(reviewDto.getTitle());
        reviewEntity.setContent(reviewDto.getContent());
        reviewEntity.setRating(reviewDto.getRating());

//        ReviewEntity reviewEntity = mapper.map(reviewDto, ReviewEntity.class);

        reviewRepository.save(reviewEntity);
    }

    @Override
    public Iterable<ReviewEntity> getReviewsAllBetween(RequestDate requestDate) {
        return null;
    }

    @Override
    public Page<ReviewEntity> getAllPageReviews(Pageable pageRequest) {
        return reviewRepository.findAll(pageRequest);
    }

    @Override
    public Page<ReviewEntity> getPageReviewsByUserId(String userId, Pageable pageRequest) {
        return reviewRepository.findAllByUserId(userId, pageRequest);
    }

    @Override
    public Page<ReviewEntity> getPageReviewsByPkgId(Long pkgId, Pageable pageRequest) {
        return reviewRepository.findAllByPkgId(pkgId, pageRequest);
    }

    @Override
    public Page<ReviewEntity> getPageReviewsByProductId(Long productId, Pageable pageRequest) {
        return reviewRepository.findAllByProductId(productId, pageRequest);
    }


    @Override
    public Page<ReviewEntity> getReviewsByUserIdAndOrderType(String userId, Integer orderType, Pageable pageRequest) {
        return reviewRepository.findAllByUserIdAndOrderType(userId, orderType, pageRequest);
    }


}
