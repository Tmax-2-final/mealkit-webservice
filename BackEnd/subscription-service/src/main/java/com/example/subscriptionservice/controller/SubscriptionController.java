package com.example.subscriptionservice.controller;

import com.example.subscriptionservice.client.AlertServiceClient;
import com.example.subscriptionservice.client.CatalogServiceClient;
import com.example.subscriptionservice.dto.SubShipDto;
import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import com.example.subscriptionservice.mq.KafkaProducer;
import com.example.subscriptionservice.querydsl.ShipsSearchParam;
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
import javax.ws.rs.Path;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/")
public class SubscriptionController {
    SubscriptionService subscriptionService;
    AlertServiceClient alertServiceClient;
    CatalogServiceClient catalogServiceClient;
    KafkaProducer kafkaProducer;
    Environment env;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService, Environment env,
                                  AlertServiceClient alertServiceClient,
                                  CatalogServiceClient catalogServiceClient, KafkaProducer kafkaProducer) {
        this.subscriptionService = subscriptionService;
        this.env = env;
        this.alertServiceClient = alertServiceClient;
        this.catalogServiceClient = catalogServiceClient;
        this.kafkaProducer = kafkaProducer;
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

        kafkaProducer.send("subscription-topic", subscriptionDto);

        // dto -> response
        ResponseSubscription responseSubscription = mapper.map(subscriptionDto, ResponseSubscription.class);

        log.info("구독 등록 API END");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseSubscription);
    }

    @ApiOperation(value = "구독 재시작", notes = "기존에 구독했던 회원의 구독취소 상태를 1:구독(구독패키지확정전)상태 및 신청한 구독등급으로 변경한다.")
    @PutMapping(value = "/subscription/restart")
    public ResponseEntity<String> restartSubscription(@RequestBody RequestUpdateSubscription requestUpdateSubscription){
        log.info("구독 재시작 API START");

        SubscriptionDto subscriptionDto = subscriptionService.restartSubscription(requestUpdateSubscription);

        kafkaProducer.send("subscription-topic", subscriptionDto);

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

        subscriptionDto = subscriptionService.updateSubscription(subscriptionDto);

        kafkaProducer.send("subscription-topic", subscriptionDto);

        log.info("구독 변경 API END");

        return ResponseEntity.status(HttpStatus.OK).body("구독변경 완료");
    }

    @ApiOperation(value = "구독 취소", notes = "회원의 구독상태를 구독취소로 변경한다. (1. 구독중, 2. 구독취소)")
    @DeleteMapping(value = "/subscription")
    public ResponseEntity<String> cancelSubscription(@RequestBody RequestCancelSubscription requestCancelSubscription){
        log.info("구독 취소 API START");

        SubscriptionDto subscriptionDto = subscriptionService.cancelSubscription(requestCancelSubscription);

        kafkaProducer.send("subscription-topic", subscriptionDto);

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

    @ApiOperation(value = "배송 등록", notes = "구독확정한 회원의 배송을 등록한다.")
    @PostMapping(value = "/ships")
    public ResponseEntity<String> createShips(@RequestBody RequestShips subships){
        log.info("배송 등록 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        boolean isAvailable = true;

        ResponseCatalog responseCatalog = null;

        for (RequestCatalog catalog: subships.getRequestCatalogList()) {
            // 카탈로그 서비스로부터 주문하려는 상품의 정보를 GET
            responseCatalog = catalogServiceClient.getCatalog(catalog.getCatalogId());
            if (responseCatalog != null && responseCatalog.getStock() - 1 < 0)
            {
                // 하나라도 재고 체크가 안될 시 반복문 break
                isAvailable = false;
                break;
            }
        }

        // 모든 주문상품에 대한 재고 체크 완료시
        if (isAvailable){
            try{
                // 주문 및 주문관리 데이터 INSERT
                //OrderDto createDto = orderService.createOrder(orderDto, orderMgtDtoList);
                // request -> dto
                SubShipDto subShipDto = mapper.map(subships, SubShipDto.class); // userDto -> userEntity 로 매핑

                subShipDto = subscriptionService.createShips(subShipDto);

                // dto -> response
                ResponseSubShip responseSubShip = mapper.map(subShipDto, ResponseSubShip.class);

                // kafka 서버에 주문 관리 데이터 push
                kafkaProducer.send("catalog-topic", subships.getRequestCatalogList());
            } catch (Exception ex){
                log.info("createOrder Error => " + ex.getMessage());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("시스템 에러");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( responseCatalog.getName() +" 상품의 재고가 부족합니다.");
        }

        log.info("배송 등록 API END");

        return ResponseEntity.status(HttpStatus.CREATED).body("배송등록 완료");
    }

    @ApiOperation(value = "배송 상태 변경", notes = "관리자가 배송 상태를 변경한다.")
    @PutMapping(value = "/ships")
    public ResponseEntity<String> updateShipsStatus(@RequestBody RequestUpdateShips requestUpdateShips){
        log.info("배송 상태 변경 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        List<SubShipDto> subShipDtoList = subscriptionService.updateShipsStatus(requestUpdateShips);

        //  1 : 상품준비중, 2:발송완료, 3 : 배송중, 4 : 배송취소, 5 : 배송완료, 6 : 구매확정
        // 배송시작 처리 알람발송
        if(requestUpdateShips.getStatus() == '3'){
            subShipDtoList.forEach(v -> {
                RequestAlert requestAlert = new RequestAlert();
                requestAlert.setType(301);
                requestAlert.setUserId(v.getUserId());
                requestAlert.setDeliveryId(v.getId());
                requestAlert.setDeliveryDate(java.sql.Date.valueOf(v.getDueDate()));

                // 구독 결제 메일 알람 발송 API
                alertServiceClient.sendAndSaveAlerts(requestAlert);
            });
        }
        // 배송완료 처리 알람발송
        else if(requestUpdateShips.getStatus() == '5'){
            subShipDtoList.forEach(v -> {
                RequestAlert requestAlert = new RequestAlert();
                requestAlert.setType(302);
                requestAlert.setUserId(v.getUserId());
                requestAlert.setDeliveryId(v.getId());

                // 구독 결제 메일 알람 발송 API
                alertServiceClient.sendAndSaveAlerts(requestAlert);
            });
        }

        log.info("배송 상태 변경 API END");

        return ResponseEntity.status(HttpStatus.OK).body("배송 상태 변경 완료");
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

//    @ApiOperation(value = "전체 배송 조회", notes = "전체 구독 배송정보를 조회한다.")
//    @GetMapping(value = "/subscription/ships")
//    public ResponseEntity<List<ResponseSubShip>> getAllSubscriptionShips(){
//        log.info("전체 구독배송 조회 API START");
//
//        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭
//
//        Iterable<SubscriptionShipsEntity> subscriptionShipsList = subscriptionService.getAllSubShips();
//
//        List<ResponseSubShip> responseSubShipList = new ArrayList<>();
//
//        subscriptionShipsList.forEach(v -> {
//            responseSubShipList.add(new ModelMapper().map(v, ResponseSubShip.class));
//        });
//
//        log.info("전체 구독배송 조회 API END");
//
//        return ResponseEntity.status(HttpStatus.OK).body(responseSubShipList);
//    }

    @ApiOperation(value = "배송 전체 페이징 조회", notes = "모든 회원들의 배송 정보를 페이지별로 조회한다.")
    @GetMapping(value = "/ships")
    public ResponseEntity<Page<ResponseSubShip>> getAllShips(@PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("배송 전체 조회 API START");

        Page<SubShipDto> shipDtoList = subscriptionService.getAllShips(pageRequest);
        Page<ResponseSubShip> responseShipList = shipDtoList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("배송 전체 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }

    @ApiOperation(value = "배송 상태+기간(시작일) 별 페이징 조회", notes = "모든 회원들의 배송 정보를 상태+기간(시작일) 별로 페이징 조회한다.")
    @GetMapping(value = "/ships/status/{status}")
    public ResponseEntity<Page<ResponseSubShip>> getShipsByStatus(@PathVariable("status") Character status,
                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="startDate", required = false) LocalDate startDate,
                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="endDate", required = false) LocalDate endDate,
                                                                              @PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("배송 상태+기간(시작일) 별 페이징 조회 API START");

        Page<SubShipDto> subscriptionList = null;

        if(startDate != null && endDate != null) {
            subscriptionList = subscriptionService.getShipsByStatusAndStartDateBetween(status, startDate, endDate, pageRequest);
        }
        else {
            subscriptionList = subscriptionService.getShipsByStatus(status, pageRequest);
        }


        Page<ResponseSubShip> responseShipList = subscriptionList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("배송 상태+기간(시작일) 별 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }

    @ApiOperation(value = "배송 기간(배송예정일) 내 키워드 페이징 조회", notes = "모든 회원들의 배송 정보를 구독 기간(배송예정일) 내 키워드 페이징 조회한다.")
    @GetMapping(value = "/ships/keyword/search")
    public ResponseEntity<Page<ResponseSubShip>> getShipsByUserIdContaining(@RequestParam(value = "searchType", required = false, defaultValue = "all") String searchType,
                                                                                        @RequestParam(value = "searchValue", required = false, defaultValue = "") String searchValue,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "startDate", required = false) LocalDate startDate,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "endDate", required = false) LocalDate endDate,
                                                                                        @PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("구독 기간(시작일) 내 키워드 페이징 조회 API START");

        // 검색에 필요한 parameter 세팅 작업
        ShipsSearchParam shipsSearchParam = new ShipsSearchParam(searchType, searchValue, startDate, endDate);

        Page<SubShipDto> shipDtoList = subscriptionService.getShipsBySearchKeyword(shipsSearchParam, pageRequest);

        Page<ResponseSubShip> responseShipList = shipDtoList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("구독 기간(시작일) 내 키워드 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }



    @ApiOperation(value = "배송 조회", notes = "특정 회원의 배송 정보를 조회한다.")
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

    @ApiOperation(value = "배송 페이징 조회", notes = "특정 회원의 배송 정보를 페이징 조회한다.")
    @GetMapping(value = "/ships/{userId}")
    public ResponseEntity<Page<ResponseSubShip>> getPagingShips(@PathVariable("userId") String userId,
                                                                      @PageableDefault(size = 4, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("배송 페이징 조회 API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // 엄격한 매칭

        Page<SubShipDto> shipsDtoList = subscriptionService.getSubPagingShips(userId, pageRequest);

        Page<ResponseSubShip> responseShipList = shipsDtoList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("배송 페이징 조회 API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
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
