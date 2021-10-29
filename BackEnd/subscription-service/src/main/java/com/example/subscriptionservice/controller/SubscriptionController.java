package com.example.subscriptionservice.controller;

import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.service.SubscriptionService;
import com.example.subscriptionservice.vo.*;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/")
public class SubscriptionController {
    SubscriptionService subscriptionService;
    Environment env;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService, Environment env) {
        this.subscriptionService = subscriptionService;
        this.env = env;
    }

    @ApiOperation(value = "구독서비스 상태체크", notes = "구독서비스 상태체크를 한다")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in User Service," +
                        "port(local.server.port)=%s, port(server.port)=%s," +
                        "token_secret=%s, token_expiration_time=%s," +
                        "gateway_ip=%s, kafka_url=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip"), env.getProperty("kafka.url"));
    }

    @ApiOperation(value = "구독등급 조회", notes = "구독등급을 조회한다.")
    @GetMapping("/subscription/grade")
    public ResponseEntity<Iterable<ResponseSubscriptionGrade>> getSubscriptionGrade() {
        log.info("구독등급 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        Iterable<SubscriptionGradeEntity> subscriptionGradeList = subscriptionService.getAllSubscriptionGrade();
        List<ResponseSubscriptionGrade> responseSubscriptionGradeList = new ArrayList<>();

        subscriptionGradeList.forEach(v -> {
            responseSubscriptionGradeList.add(new ModelMapper().map(v, ResponseSubscriptionGrade.class));
        });

        log.info("구독등급 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionGradeList);
    }

//    @ApiOperation(value = "특정회원 구독등급 조회", notes = "특정회원의 구독등급을 조회한다.")
//    @GetMapping("/subscription/grade/{userId}")
//    public ResponseEntity<ResponseSubscriptionGrade> getUserSubscriptionGrade(@PathVariable("userId") String userId) {
//        log.info("특정회원 구독등급 조회 API START");
//
//        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
//
//        SubscriptionDto subscriptionDto = subscriptionService.getSubscription(userId);
//
//        SubscriptionGradeEntity subscriptionGradeEntity = subscriptionService.getSubscriptionGrade(subscriptionDto.getSubGradeId());
//
//        ResponseSubscriptionGrade responseSubscriptionGrade = mapper.map(subscriptionGradeEntity, ResponseSubscriptionGrade.class);
//
//        log.info("특정회원 구독등급 조회 API END");
//
//        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionGrade);
//    }

    @ApiOperation(value = "구독 등록", notes = "구독 신청한 회원의 구독을 등록한다.")
    @PostMapping(value = "/subscription")
    public ResponseEntity<ResponseSubscription> createSubscription(@RequestBody RequestSubscription subscription){
        log.info("구독 등록 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        // request -> dto
        SubscriptionDto subscriptionDto = mapper.map(subscription, SubscriptionDto.class); // userDto -> userEntity 로 매핑

        subscriptionDto = subscriptionService.createSubscription(subscriptionDto);
        // dto -> response
        ResponseSubscription responseSubscription = mapper.map(subscriptionDto, ResponseSubscription.class);

        log.info("구독 등록 API END");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseSubscription);
    }

    @ApiOperation(value = "구독 변경", notes = "회원의 구독을 변경한다.")
    @PutMapping(value = "/subscription")
    public ResponseEntity<String> updateSubscription(@RequestBody RequestUpdateSubscription requestUpdateSubscription){
        log.info("구독 변경 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        SubscriptionDto subscriptionDto = subscriptionService.getSubscription(requestUpdateSubscription.getUserId());

        subscriptionDto.setChangeSubGradeId(requestUpdateSubscription.getSubGradeId());

        subscriptionService.updateSubscription(subscriptionDto);

        log.info("구독 변경 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독변경 완료");
    }

    @ApiOperation(value = "구독 취소", notes = "회원의 구독상태를 구독취소로 변경한다. (1. 구독중, 2. 구독취소)")
    @DeleteMapping(value = "/subscription")
    public ResponseEntity<String> cancelSubscription(@RequestBody RequestCancelSubscription requestCancelSubscription){
        log.info("구독 취소 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        // 요청 userId 로 구독정보 조회 , 구독취소 사유 설정
        SubscriptionDto subscriptionDto = subscriptionService.getSubscription(requestCancelSubscription.getUserId());
        subscriptionDto.setCancelContent(requestCancelSubscription.getCancelContent());

        subscriptionService.cancelSubscription(subscriptionDto);

        log.info("구독 변경 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독취소 완료");
    }
    
    @ApiOperation(value = "구독 조회", notes = "특정 회원의 구독 정보를 조회한다.")
    @GetMapping(value = "/subscription/{userId}")
    public ResponseEntity<ResponseSubscription> getSubscription(@PathVariable("userId") String userId){
        log.info("구독 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        SubscriptionDto subscriptionDto = subscriptionService.getSubscription(userId);

        // dto -> response
        ResponseSubscription responseSubscription = mapper.map(subscriptionDto, ResponseSubscription.class);

        log.info("구독 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscription);
    }

    @ApiOperation(value = "구독 결제", notes = "결제일이 당일인 구독들을 결제한다.")
    @GetMapping(value = "/subscription/payment")
    public ResponseEntity<String> paymentSubscription(){
        log.info("구독 결제 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        // 구독 결제 서비스 호출
        subscriptionService.paymentSubscription();

        log.info("구독 결제 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독 결제 완료");
    }


    @ApiOperation(value = "구독여부 확인", notes = "구독여부를 확인한다.")
    @GetMapping(value = "/subscription/exist/{userId}")
    public ResponseEntity<Long> existSubscription(@PathVariable("userId") String userId){
        log.info("구독여부 확인 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        Long existSubscription = subscriptionService.existSubscription(userId);

        log.info("구독여부 확인 API END");

        return ResponseEntity.status(HttpStatus.OK).body(existSubscription);
    }
}
