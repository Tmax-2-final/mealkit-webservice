package com.example.reviewservice.controller;

import com.example.reviewservice.dto.ReviewDto;
import com.example.reviewservice.entity.ReviewEntity;
import com.example.reviewservice.service.ReviewService;
import com.example.reviewservice.vo.RequestDeleteReview;
import com.example.reviewservice.vo.RequestReview;
import com.example.reviewservice.vo.ResponseReview;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/")
public class ReviewController {
    ReviewService reviewService;
    Environment env;

    @Autowired
    public ReviewController(Environment env, ReviewService reviewService) {
        this.env = env;
        this.reviewService = reviewService;
    }

    @ApiOperation(value = "리뷰서비스 상태체크", notes = "리뷰서비스 상태체크를 한다")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in Review Service," +
                        "port(local.server.port)=%s, port(server.port)=%s," +
                        "token_secret=%s, token_expiration_time=%s," +
                        "gateway_ip=]==" +
                        " `%s, kafka_url=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip"));
    }

    @ApiOperation(value = "리뷰 등록", notes = "사용자의 리뷰 등록")
    @PostMapping("/reviews")
    public ResponseEntity<ResponseReview> createReview(@RequestBody @Valid RequestReview review) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        ReviewDto reviewDto = mapper.map(review, ReviewDto.class);
        reviewService.createReview(reviewDto);
        ResponseReview responseReview = mapper.map(reviewDto, ResponseReview.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseReview);
    }

    @ApiOperation(value = "리뷰 조회", notes = "관리자의 리뷰 전체 목록 조회")
    @GetMapping("/reviews")
    public ResponseEntity<Iterable<ReviewEntity>> getReview(){
        log.info("Before retrieve All Reviews data");
        Iterable<ReviewEntity> reviewList = reviewService.getAllReviews();
        log.info("After retrieve All Reviews data");

        return ResponseEntity.status(HttpStatus.OK).body(reviewList);
    }

    @ApiOperation(value = "회원 리뷰 조회", notes = "특정 회원의 리뷰 모두 조회")
    @GetMapping("/reviews/{userId}")
    public ResponseEntity<List<ResponseReview>> getReview(@PathVariable("userId") String userId){
        Iterable<ReviewEntity> reviewList = reviewService.getReviewsByUserId(userId);
        List<ResponseReview> responseReviewList = new ArrayList<>();
        // 람다 표현식; list 내에 있는 데이터를 v라고 두고, 이 v에 대한 어떤 액션을 하겠다는 '->'
        // list 안의 데이터 요소를 mapper 를 활용해 responseUser 형태로 바꿔서 결과값을 반환할 list 에 저장
        reviewList.forEach(v -> {
            System.out.println(v.getReviewId());
            responseReviewList.add(new ModelMapper().map(v, ResponseReview.class));
        });
        return ResponseEntity.status(HttpStatus.OK).body(responseReviewList);
    }

    @ApiOperation(value = "패키지별 리뷰 조회", notes = "특정 패키지 상품의 리뷰 모두 조회")
    @GetMapping("/reviews/pkg/{pkgId}")
    public ResponseEntity<List<ResponseReview>> getReviewByPkgId(@PathVariable("pkgId") Long pkgId){
        Iterable<ReviewEntity> reviewList = reviewService.getReviewsByPkgId(pkgId);
        List<ResponseReview> responseReviewList = new ArrayList<>();
        // 람다 표현식; list 내에 있는 데이터를 v라고 두고, 이 v에 대한 어떤 액션을 하겠다는 '->'
        // list 안의 데이터 요소를 mapper 를 활용해 responseUser 형태로 바꿔서 결과값을 반환할 list 에 저장
        reviewList.forEach(v -> {
            System.out.println(v.getReviewId());
            responseReviewList.add(new ModelMapper().map(v, ResponseReview.class));
        });
        return ResponseEntity.status(HttpStatus.OK).body(responseReviewList);
    }

    @ApiOperation(value = "상품별 리뷰 조회", notes = "특정 상품의 리뷰 모두 조회")
    @GetMapping("/reviews/product/{productId}")
    public ResponseEntity<List<ResponseReview>> getReviewByProductId(@PathVariable("productId") Long productId){
        Iterable<ReviewEntity> reviewList = reviewService.getReviewsByProductId(productId);
        List<ResponseReview> responseReviewList = new ArrayList<>();
        // 람다 표현식; list 내에 있는 데이터를 v라고 두고, 이 v에 대한 어떤 액션을 하겠다는 '->'
        // list 안의 데이터 요소를 mapper 를 활용해 responseUser 형태로 바꿔서 결과값을 반환할 list 에 저장
        reviewList.forEach(v -> {
            System.out.println(v.getReviewId());
            responseReviewList.add(new ModelMapper().map(v, ResponseReview.class));
        });
        return ResponseEntity.status(HttpStatus.OK).body(responseReviewList);
    }


    @ApiOperation(value = "리뷰 삭제", notes = "해당 고객이 자신이 작성한 리뷰 삭제")
    @DeleteMapping("/reviews/{userId}/{reviewId}")
    public ResponseEntity<ResponseReview> deleteReview(@PathVariable("userId") String userId,
                                                       @PathVariable("reviewId") Long reviewId){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try{
            reviewService.deleteReview(userId, reviewId);
        } catch (Exception ex){
            log.info("delete Review Error => " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @ApiOperation(value = "리뷰 수정", notes = "해당 고객이 자신이 작성한 리뷰 수정")
    @PutMapping("/reviews/{userId}/{reviewId}")
    public ResponseEntity<ResponseReview> updateReview(@RequestBody RequestReview requestReview,
                                                       @PathVariable("userId") String userId,
                                                       @PathVariable("reviewId") Long reviewId){

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        ReviewDto reviewDto = mapper.map(requestReview, ReviewDto.class);
        reviewService.updateReview(reviewDto, userId, reviewId);
        ResponseReview responseReview = mapper.map(reviewDto, ResponseReview.class);

        return ResponseEntity.status(HttpStatus.OK).body(responseReview);
    }

    @ApiOperation(value = "리뷰 전체 페이징 조회", notes = "모든 회원들의 리뷰 정보를 페이지별로 조회한다.")
    @GetMapping(value = "/reviews/page")
    public ResponseEntity<Page<ResponseReview>> getAllPageReviews(@PageableDefault(size = 8, sort = "reviewId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("구독 전체 조회 API START");

        Page<ReviewEntity> reviewList = reviewService.getAllPageReviews(pageRequest);
        Page<ResponseReview> responseReviewList = reviewList.map(
                v -> new ModelMapper().map(v, ResponseReview.class)
        );

        log.info("리뷰 전체 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseReviewList);
    }

    @ApiOperation(value = "회원별 리뷰 페이징 조회", notes = "회원별 리뷰 정보를 페이지별로 조회한다.")
    @GetMapping(value = "/reviews/page/{userId}")
    public ResponseEntity<Page<ResponseReview>> getPageReviewsByUserId(@PathVariable("userId") String userId,
                                                                       @PageableDefault(size = 8, sort = "reviewId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("리뷰 조회 API START");

        Page<ReviewEntity> reviewList = reviewService.getPageReviewsByUserId(userId, pageRequest);
        Page<ResponseReview> responseReviewList = reviewList.map(
                v -> new ModelMapper().map(v, ResponseReview.class)
        );

        log.info("리뷰 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseReviewList);
    }

    @ApiOperation(value = "상품별 리뷰 페이징 조회", notes = "상품별 리뷰 정보를 페이지별로 조회한다.")
    @GetMapping(value = "/reviews/page/product/{productId}")
    public ResponseEntity<Page<ResponseReview>> getPageReviewsByProductId(@PathVariable("productId") Long productId,
                                                                          @PageableDefault(size = 8, sort = "reviewId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("구독 조회 API START");

        Page<ReviewEntity> reviewList = reviewService.getPageReviewsByProductId(productId, pageRequest);
        Page<ResponseReview> responseReviewList = reviewList.map(
                v -> new ModelMapper().map(v, ResponseReview.class)
        );

        log.info("리뷰 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseReviewList);
    }

    @ApiOperation(value = "패키지별 리뷰 페이징 조회", notes = "패키지별 리뷰 정보를 페이지별로 조회한다.")
    @GetMapping(value = "/reviews/page/pkg/{pkgId}")
    public ResponseEntity<Page<ResponseReview>> getPageReviewsByPkgId(@PathVariable("pkgId") Long pkgId,
                                                                      @PageableDefault(size = 8, sort = "reviewId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("리뷰 조회 API START");

        Page<ReviewEntity> reviewList = reviewService.getPageReviewsByPkgId(pkgId, pageRequest);
        Page<ResponseReview> responseReviewList = reviewList.map(
                v -> new ModelMapper().map(v, ResponseReview.class)
        );

        log.info("리뷰 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseReviewList);
    }

}
