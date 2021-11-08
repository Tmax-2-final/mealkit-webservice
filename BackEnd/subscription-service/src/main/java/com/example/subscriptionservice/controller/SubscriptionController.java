package com.example.subscriptionservice.controller;

import com.example.subscriptionservice.dto.SubShipDto;
import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import com.example.subscriptionservice.querydsl.SubscriptionSearchParam;
import com.example.subscriptionservice.service.SubscriptionService;
import com.example.subscriptionservice.vo.*;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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

    @ApiOperation(value = "구독등급 상세정보 조회", notes = "구독등급 상세정보를 조회한다.")
    @GetMapping("/subscription/grade/{subGradeId}")
    public ResponseEntity<ResponseSubscriptionGrade> getUserSubscriptionGrade(@PathVariable("subGradeId") Integer subGradeId) {
        log.info("특정회원 구독등급 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SubscriptionGradeDto subscriptionGradeDto = subscriptionService.getSubscriptionGrade(subGradeId);

        ResponseSubscriptionGrade responseSubscriptionGrade = mapper.map(subscriptionGradeDto, ResponseSubscriptionGrade.class);

        log.info("특정회원 구독등급 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionGrade);
    }

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

    @ApiOperation(value = "구독 재시작", notes = "기존에 구독했던 회원의 구독취소 상태를 1:구독(구독패키지확정전)상태 및 신청한 구독등급으로 변경한다.")
    @PutMapping(value = "/subscription/restart")
    public ResponseEntity<String> restartSubscription(@RequestBody RequestUpdateSubscription requestUpdateSubscription){
        log.info("구독 재시작 API START");

        subscriptionService.restartSubscription(requestUpdateSubscription);

        log.info("구독 재시작 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독 재시작 완료");
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

        subscriptionService.cancelSubscription(requestCancelSubscription);

        log.info("구독 변경 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독취소 완료");
    }

    @ApiOperation(value = "구독 전체 페이징 조회", notes = "모든 회원들의 구독 정보를 페이지별로 조회한다.")
    @GetMapping(value = "/subscription")
    public ResponseEntity<Page<ResponseSubscription>> getAllSubscription(@PageableDefault(size = 8, sort = "subId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("구독 전체 조회 API START");

        Page<SubscriptionDto> subscriptionList = subscriptionService.getAllSubscription(pageRequest);
        Page<ResponseSubscription> responseSubscriptionList = subscriptionList.map(
                v -> new ModelMapper().map(v, ResponseSubscription.class)
        );

        log.info("구독 전체 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
    }

    @ApiOperation(value = "구독 상태+기간(시작일) 별 페이징 조회", notes = "모든 회원들의 구독 정보를 상태+기간(시작일) 별로 페이징 조회한다.")
    @GetMapping(value = "/subscription/status/{status}")
    public ResponseEntity<Page<ResponseSubscription>> getSubscriptionByStatus(@PathVariable("status") Character status,
                                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="startDate", required = false) LocalDate startDate,
                                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="endDate", required = false) LocalDate endDate,
                                                                            @PageableDefault(size = 8, sort = "subId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("구독 상태+기간(시작일) 별 페이징 조회 API START");

        Page<SubscriptionDto> subscriptionList = null;

        if(startDate != null && endDate != null) {
            // 날짜 타입 변경 LocalDate -> Date
            subscriptionList = subscriptionService.getSubscriptionByStatusAndStartDateBetween(status, startDate, endDate, pageRequest);
        }
        else {
            subscriptionList = subscriptionService.getSubscriptionByStatus(status, pageRequest);
        }


        Page<ResponseSubscription> responseSubscriptionList = subscriptionList.map(
                v -> new ModelMapper().map(v, ResponseSubscription.class)
        );

        log.info("구독 상태+기간(시작일) 별 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
    }

    @ApiOperation(value = "구독 기간(시작일) 내 키워드 페이징 조회", notes = "모든 회원들의 구독 정보를 구독 기간(시작일) 내 키워드 페이징 조회한다.")
    @GetMapping(value = "/subscription/keyword/search")
    public ResponseEntity<Page<ResponseSubscription>> getSubscriptionByUserIdContaining(@RequestParam(value = "searchType", required = false, defaultValue = "all") String searchType,
                                                                                        @RequestParam(value = "searchValue", required = false, defaultValue = "") String searchValue,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "startDate", required = false) LocalDate startDate,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "endDate", required = false) LocalDate endDate,
                                                                                        @PageableDefault(size = 8, sort = "subId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("구독 기간(시작일) 내 키워드 페이징 조회 API START");

        // 검색에 필요한 parameter 세팅 작업
        SubscriptionSearchParam subscriptionSearchParam = new SubscriptionSearchParam(searchType, searchValue, startDate, endDate);

        Page<SubscriptionDto> subscriptionList = subscriptionService.getSubscriptionBySearchKeyword(subscriptionSearchParam, pageRequest);

        Page<ResponseSubscription> responseSubscriptionList = subscriptionList.map(
                v -> new ModelMapper().map(v, ResponseSubscription.class)
        );

        log.info("구독 기간(시작일) 내 키워드 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
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
    @PutMapping(value = "/subscription/payment")
    public ResponseEntity<List<ResponseSubscription>> paymentSubscription(){
        log.info("구독 결제 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        // 구독 결제 서비스 호출
        Iterable<SubscriptionDto> subscriptionDtoList = subscriptionService.paymentSubscription();

        List<ResponseSubscription> responseSubscriptionList = new ArrayList<>();

        subscriptionDtoList.forEach(v -> {
            // 구독등급 Dto 값 설정
            SubscriptionGradeDto subscriptionGradeDto = subscriptionService.getSubscriptionGrade(v.getSubGradeId());
            v.setSubscriptionGradeDto(subscriptionGradeDto);
            responseSubscriptionList.add(new ModelMapper().map(v, ResponseSubscription.class));
        });

        log.info("구독 결제 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
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

    @ApiOperation(value = "구독배송 등록", notes = "구독확정한 회원의 구독 배송을 등록한다.")
    @PostMapping(value = "/subscription/ships")
    public ResponseEntity<ResponseSubShip> createSubscriptionShips(@RequestBody RequestSubShip subships){
        log.info("구독배송 등록 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
        // request -> dto
        SubShipDto subShipDto = mapper.map(subships, SubShipDto.class); // userDto -> userEntity 로 매핑

        subShipDto = subscriptionService.createSubShips(subShipDto);
        // dto -> response
        ResponseSubShip responseSubShip = mapper.map(subShipDto, ResponseSubShip.class);

        log.info("구독배송 등록 API END");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseSubShip);
    }

    @ApiOperation(value = "특정회원 환불금액 조회", notes = "구독취소하려는 회원의 환불금액을 조회한다.")
    @GetMapping(value = "/subscription/refundamount/{userId}")
    public ResponseEntity<Long> geRefundAmount(@PathVariable("userId") String userId){
        log.info("특정회원 환불금액 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        Long refundAmount = subscriptionService.getRefundAmount(userId);

        log.info("특정회원 환불금액 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(refundAmount);
    }

    @ApiOperation(value = "구독패키지 확정", notes = "회원의 구독패키지를 확정한다.")
    @PutMapping(value = "/subscription/confirmsubpkg")
    public ResponseEntity<String> confirmSubPkg(@RequestParam(value="userId") String userId,
                                                @RequestParam(value="pkgId") Long pkgId){
        log.info("구독패키지 확정 API START");

        subscriptionService.confirmSubPkg(userId, pkgId);

        log.info("구독패키지 확정 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독패키지 확정 완료");
    }

    @ApiOperation(value = "전체 구독배송 조회", notes = "전체 구독 배송정보를 조회한다.")
    @GetMapping(value = "/subscription/ships")
    public ResponseEntity<List<ResponseSubShip>> getAllSubscriptionShips(){
        log.info("전체 구독배송 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        Iterable<SubscriptionShipsEntity> subscriptionShipsList = subscriptionService.getAllSubShips();

        List<ResponseSubShip> responseSubShipList = new ArrayList<>();

        subscriptionShipsList.forEach(v -> {
            responseSubShipList.add(new ModelMapper().map(v, ResponseSubShip.class));
        });

        log.info("전체 구독배송 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubShipList);
    }

    @ApiOperation(value = "구독배송 조회", notes = "특정 회원의 구독배송 정보를 조회한다.")
    @GetMapping(value = "/subscription/ships/{userId}")
    public ResponseEntity<List<ResponseSubShip>> getSubscriptionShips(@PathVariable("userId") String userId){
        log.info("구독배송 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        Iterable<SubscriptionShipsEntity> subscriptionShipsList = subscriptionService.getSubShips(userId);

        List<ResponseSubShip> responseSubShipList = new ArrayList<>();

        subscriptionShipsList.forEach(v -> {
            responseSubShipList.add(new ModelMapper().map(v, ResponseSubShip.class));
        });

        log.info("구독배송 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubShipList);
    }

    @ApiOperation(value = "구독배송 배송정보 변경", notes = "특정 구독배송의 배송정보를 변경한다.")
    @PutMapping(value = "/subscription/ships/{shipId}")
    public ResponseEntity<String> updateSubShip(@PathVariable("shipId") Long shipId,
                                                @RequestParam(value="address") String address,
                                                @RequestParam(value="addressDetail") String addressDetail,
                                                @RequestParam(value="postcode") String postcode,
                                                @RequestParam(value="type") Character type,
                                                @RequestParam(value="dueDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDate){
        log.info("구독배송 배송정보 변경 API START");

        subscriptionService.updateSubShip(shipId, postcode, address, addressDetail, dueDate, type);

        log.info("구독배송 배송정보 변경 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독배송 배송정보 변경 완료");
    }

    @ApiOperation(value = "매출액 조회", notes = "타입별 매출액을 조회한다.")
    @GetMapping(value = "/subscription/revenue/{type}")
    public ResponseEntity<Long> getRevenue(@PathVariable("type") String type){
        log.info("매출액 조회 API START");

        Long revenue = 0L;

        // 전체 매출액
        if(type.equals("total")) revenue = subscriptionService.getTotalRevenue();
        // 최근 매출액 (기간 : 1달전 ~ 오늘)
        if(type.equals("recent")) revenue = subscriptionService.getRevenueMonth();
        // 1달전 매출액 (기간 : 2달전~1달전)
        if(type.equals("past")) revenue = subscriptionService.getRevenueMonthAgo();

        log.info("매출액 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }

    @ApiOperation(value = "구독 수 조회", notes = "타입별 구독수를 조회한다.")
    @GetMapping(value = "/subscription/count/{type}")
    public ResponseEntity<Long> getSubscriptionCnt(@PathVariable("type") String type){
        log.info("구독 수 조회 API START");

        Long subscriptionCnt = 0L;

        // 전체 구독 수
        if(type.equals("total")) subscriptionCnt = subscriptionService.getTotalSubscriptionCnt();
        // 오늘 구독 수
        if(type.equals("new")) subscriptionCnt = subscriptionService.getNewSubscriptionCnt();

        log.info("구독 수 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(subscriptionCnt);
    }
}
