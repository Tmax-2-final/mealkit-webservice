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

    @ApiOperation(value = "??????????????? ????????????", notes = "??????????????? ??????????????? ??????")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in User Service," +
                        "port(local.server.port)=%s, port(server.port)=%s," +
                        "token_secret=%s, token_expiration_time=%s," +
                        "gateway_ip=%s, kafka_url=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip"), env.getProperty("kafka.url"));
    }

    @ApiOperation(value = "???????????? ??????", notes = "??????????????? ????????????.")
    @GetMapping("/subscription/grade")
    public ResponseEntity<Iterable<ResponseSubscriptionGrade>> getSubscriptionGrade() {
        log.info("???????????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        Iterable<SubscriptionGradeEntity> subscriptionGradeList = subscriptionService.getAllSubscriptionGrade();
        List<ResponseSubscriptionGrade> responseSubscriptionGradeList = new ArrayList<>();

        subscriptionGradeList.forEach(v -> {
            responseSubscriptionGradeList.add(new ModelMapper().map(v, ResponseSubscriptionGrade.class));
        });

        log.info("???????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionGradeList);
    }

    @ApiOperation(value = "???????????? ???????????? ??????", notes = "???????????? ??????????????? ????????????.")
    @GetMapping("/subscription/grade/{subGradeId}")
    public ResponseEntity<ResponseSubscriptionGrade> getUserSubscriptionGrade(@PathVariable("subGradeId") Integer subGradeId) {
        log.info("???????????? ???????????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        SubscriptionGradeDto subscriptionGradeDto = subscriptionService.getSubscriptionGrade(subGradeId);

        ResponseSubscriptionGrade responseSubscriptionGrade = mapper.map(subscriptionGradeDto, ResponseSubscriptionGrade.class);

        log.info("???????????? ???????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionGrade);
    }

    @ApiOperation(value = "?????? ??????", notes = "?????? ????????? ????????? ????????? ????????????.")
    @PostMapping(value = "/subscription")
    public ResponseEntity<ResponseSubscription> createSubscription(@RequestBody RequestSubscription subscription){
        log.info("?????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????
        // request -> dto
        SubscriptionDto subscriptionDto = mapper.map(subscription, SubscriptionDto.class); // userDto -> userEntity ??? ??????

        subscriptionDto = subscriptionService.createSubscription(subscriptionDto);

        // ????????? ?????? ????????? ?????? ?????? ?????? ??????
        kafkaProducer.send("subscription-topic", subscriptionDto);

        // dto -> response
        ResponseSubscription responseSubscription = mapper.map(subscriptionDto, ResponseSubscription.class);

        log.info("?????? ?????? API END");

        return ResponseEntity.status(HttpStatus.CREATED).body(responseSubscription);
    }

    @ApiOperation(value = "?????? ?????????", notes = "????????? ???????????? ????????? ???????????? ????????? 1:??????(????????????????????????)?????? ??? ????????? ?????????????????? ????????????.")
    @PutMapping(value = "/subscription/restart")
    public ResponseEntity<String> restartSubscription(@RequestBody RequestUpdateSubscription requestUpdateSubscription){
        log.info("?????? ????????? API START");

        SubscriptionDto subscriptionDto = subscriptionService.restartSubscription(requestUpdateSubscription);

        // ????????? ?????? ????????? ?????? ????????? ?????? ??????
        kafkaProducer.send("subscription-topic", subscriptionDto);

        log.info("?????? ????????? API END");

        return ResponseEntity.status(HttpStatus.OK).body("?????? ????????? ??????");
    }

    @ApiOperation(value = "?????? ??????", notes = "????????? ????????? ????????????.")
    @PutMapping(value = "/subscription")
    public ResponseEntity<String> updateSubscription(@RequestBody RequestUpdateSubscription requestUpdateSubscription){
        log.info("?????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        SubscriptionDto subscriptionDto = subscriptionService.getSubscription(requestUpdateSubscription.getUserId());

        subscriptionDto.setChangeSubGradeId(requestUpdateSubscription.getSubGradeId());

        subscriptionService.updateSubscription(subscriptionDto);

        // ????????? ?????? ????????? ?????? ?????? ?????? ??????
        kafkaProducer.send("subscription-topic", subscriptionDto);

        log.info("?????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body("???????????? ??????");
    }

    @ApiOperation(value = "?????? ??????", notes = "????????? ??????????????? ??????????????? ????????????. (1. ?????????, 2. ????????????)")
    @DeleteMapping(value = "/subscription")
    public ResponseEntity<String> cancelSubscription(@RequestBody RequestCancelSubscription requestCancelSubscription){
        log.info("?????? ?????? API START");

        SubscriptionDto subscriptionDto = subscriptionService.cancelSubscription(requestCancelSubscription);

        // ????????? ?????? ????????? ?????? ?????? ?????? ??????
        kafkaProducer.send("subscription-topic", subscriptionDto);

        log.info("?????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body("???????????? ??????");
    }

    @ApiOperation(value = "?????? ?????? ????????? ??????", notes = "?????? ???????????? ?????? ????????? ??????????????? ????????????.")
    @GetMapping(value = "/subscription")
    public ResponseEntity<Page<ResponseSubscription>> getAllSubscription(@PageableDefault(size = 8, sort = "subId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ?????? ?????? API START");

        Page<SubscriptionDto> subscriptionList = subscriptionService.getAllSubscription(pageRequest);
        Page<ResponseSubscription> responseSubscriptionList = subscriptionList.map(
                v -> new ModelMapper().map(v, ResponseSubscription.class)
        );

        log.info("?????? ?????? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
    }

    @ApiOperation(value = "?????? ??????+??????(?????????) ??? ????????? ??????", notes = "?????? ???????????? ?????? ????????? ??????+??????(?????????) ?????? ????????? ????????????.")
    @GetMapping(value = "/subscription/status/{status}")
    public ResponseEntity<Page<ResponseSubscription>> getSubscriptionByStatus(@PathVariable("status") Character status,
                                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="startDate", required = false) LocalDate startDate,
                                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="endDate", required = false) LocalDate endDate,
                                                                            @PageableDefault(size = 8, sort = "subId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ??????+??????(?????????) ??? ????????? ?????? API START");

        Page<SubscriptionDto> subscriptionList = null;

        if(startDate != null && endDate != null) {
            subscriptionList = subscriptionService.getSubscriptionByStatusAndStartDateBetween(status, startDate, endDate, pageRequest);
        }
        else {
            subscriptionList = subscriptionService.getSubscriptionByStatus(status, pageRequest);
        }


        Page<ResponseSubscription> responseSubscriptionList = subscriptionList.map(
                v -> new ModelMapper().map(v, ResponseSubscription.class)
        );

        log.info("?????? ??????+??????(?????????) ??? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
    }

    @ApiOperation(value = "?????? ??????(?????????) ??? ????????? ????????? ??????", notes = "?????? ???????????? ?????? ????????? ?????? ??????(?????????) ??? ????????? ????????? ????????????.")
    @GetMapping(value = "/subscription/keyword/search")
    public ResponseEntity<Page<ResponseSubscription>> getSubscriptionByUserIdContaining(@RequestParam(value = "searchType", required = false, defaultValue = "all") String searchType,
                                                                                        @RequestParam(value = "searchValue", required = false, defaultValue = "") String searchValue,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "startDate", required = false) LocalDate startDate,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "endDate", required = false) LocalDate endDate,
                                                                                        @PageableDefault(size = 8, sort = "subId", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ??????(?????????) ??? ????????? ????????? ?????? API START");

        // ????????? ????????? parameter ?????? ??????
        SubscriptionSearchParam subscriptionSearchParam = new SubscriptionSearchParam(searchType, searchValue, startDate, endDate);

        Page<SubscriptionDto> subscriptionList = subscriptionService.getSubscriptionBySearchKeyword(subscriptionSearchParam, pageRequest);

        Page<ResponseSubscription> responseSubscriptionList = subscriptionList.map(
                v -> new ModelMapper().map(v, ResponseSubscription.class)
        );

        log.info("?????? ??????(?????????) ??? ????????? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
    }

    @ApiOperation(value = "?????? ??????", notes = "?????? ????????? ?????? ????????? ????????????.")
    @GetMapping(value = "/subscription/{userId}")
    public ResponseEntity<ResponseSubscription> getSubscription(@PathVariable("userId") String userId){
        log.info("?????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        SubscriptionDto subscriptionDto = subscriptionService.getSubscription(userId);

        // dto -> response
        ResponseSubscription responseSubscription = mapper.map(subscriptionDto, ResponseSubscription.class);

        log.info("?????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscription);
    }

    @ApiOperation(value = "?????? ??????", notes = "???????????? ????????? ???????????? ????????????.")
    @PutMapping(value = "/subscription/payment")
    public ResponseEntity<List<ResponseSubscription>> paymentSubscription(){
        log.info("?????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        // ?????? ?????? ????????? ??????
        Iterable<SubscriptionDto> subscriptionDtoList = subscriptionService.paymentSubscription();

        List<ResponseSubscription> responseSubscriptionList = new ArrayList<>();

        subscriptionDtoList.forEach(v -> {
            // ???????????? Dto ??? ??????
            SubscriptionGradeDto subscriptionGradeDto = subscriptionService.getSubscriptionGrade(v.getSubGradeId());
            v.setSubscriptionGradeDto(subscriptionGradeDto);
            responseSubscriptionList.add(new ModelMapper().map(v, ResponseSubscription.class));
        });

        log.info("?????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubscriptionList);
    }

    @ApiOperation(value = "???????????? ??????", notes = "??????????????? ????????????.")
    @GetMapping(value = "/subscription/exist/{userId}")
    public ResponseEntity<Long> existSubscription(@PathVariable("userId") String userId){
        log.info("???????????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        Long existSubscription = subscriptionService.existSubscription(userId);

        log.info("???????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(existSubscription);
    }

    @ApiOperation(value = "?????? ??????", notes = "??????????????? ????????? ????????? ????????????.")
    @PostMapping(value = "/ships")
    public ResponseEntity<String> createShips(@RequestBody RequestShips subships){
        log.info("?????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        boolean isAvailable = true;

        ResponseCatalog responseCatalog = null;

        for (RequestCatalog catalog: subships.getRequestCatalogList()) {
            // ???????????? ?????????????????? ??????????????? ????????? ????????? GET
            responseCatalog = catalogServiceClient.getCatalog(catalog.getCatalogId());
            if (responseCatalog != null && responseCatalog.getStock() - 1 < 0)
            {
                // ???????????? ?????? ????????? ?????? ??? ????????? break
                isAvailable = false;
                break;
            }
        }

        // ?????? ??????????????? ?????? ?????? ?????? ?????????
        if (isAvailable){
            try{
                // ?????? ??? ???????????? ????????? INSERT
                //OrderDto createDto = orderService.createOrder(orderDto, orderMgtDtoList);
                // request -> dto
                SubShipDto subShipDto = mapper.map(subships, SubShipDto.class); // userDto -> userEntity ??? ??????

                subShipDto = subscriptionService.createShips(subShipDto);

                // dto -> response
                ResponseSubShip responseSubShip = mapper.map(subShipDto, ResponseSubShip.class);

                // kafka ????????? ?????? ?????? ????????? push
                kafkaProducer.send("catalog-topic", subships.getRequestCatalogList());
            } catch (Exception ex){
                log.info("createOrder Error => " + ex.getMessage());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("????????? ??????");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( responseCatalog.getName() +" ????????? ????????? ???????????????.");
        }

        log.info("?????? ?????? API END");

        return ResponseEntity.status(HttpStatus.CREATED).body("???????????? ??????");
    }

    @ApiOperation(value = "?????? ?????? ??????", notes = "???????????? ?????? ????????? ????????????.")
    @PutMapping(value = "/ships")
    public ResponseEntity<String> updateShipsStatus(@RequestBody RequestUpdateShips requestUpdateShips){
        log.info("?????? ?????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        List<SubShipDto> subShipDtoList = subscriptionService.updateShipsStatus(requestUpdateShips);

        //  1 : ???????????????, 2:????????????, 3 : ?????????, 4 : ????????????, 5 : ????????????, 6 : ????????????
        // ???????????? ?????? ????????????
//        if(requestUpdateShips.getStatus() == ShipStatus.SHIPPING.getValue()){
//            subShipDtoList.forEach(v -> {
//                RequestAlert requestAlert = new RequestAlert();
//                requestAlert.setType(301);
//                requestAlert.setUserId(v.getUserId());
//                requestAlert.setDeliveryId(v.getId());
//                requestAlert.setDeliveryDate(java.sql.Date.valueOf(v.getDueDate()));
//
//                // ?????? ?????? ?????? ?????? ?????? API
//                alertServiceClient.sendAndSaveAlerts(requestAlert);
//            });
//        }
//        // ???????????? ?????? ????????????
//        else if(requestUpdateShips.getStatus() == ShipStatus.COMPLETE.getValue()){
//            subShipDtoList.forEach(v -> {
//                RequestAlert requestAlert = new RequestAlert();
//                requestAlert.setType(302);
//                requestAlert.setUserId(v.getUserId());
//                requestAlert.setDeliveryId(v.getId());
//
//                // ?????? ?????? ?????? ?????? ?????? API
//                alertServiceClient.sendAndSaveAlerts(requestAlert);
//            });
//        }

        log.info("?????? ?????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body("?????? ?????? ?????? ??????");
    }

    @ApiOperation(value = "???????????? ???????????? ??????", notes = "????????????????????? ????????? ??????????????? ????????????.")
    @GetMapping(value = "/subscription/refundamount/{userId}")
    public ResponseEntity<Long> geRefundAmount(@PathVariable("userId") String userId){
        log.info("???????????? ???????????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        Long refundAmount = subscriptionService.getRefundAmount(userId);

        log.info("???????????? ???????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(refundAmount);
    }

    @ApiOperation(value = "??????????????? ??????", notes = "????????? ?????????????????? ????????????.")
    @PutMapping(value = "/subscription/confirmsubpkg")
    public ResponseEntity<String> confirmSubPkg(@RequestParam(value="userId") String userId,
                                                @RequestParam(value="pkgId") Long pkgId){
        log.info("??????????????? ?????? API START");

        subscriptionService.confirmSubPkg(userId, pkgId);

        log.info("??????????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body("??????????????? ?????? ??????");
    }

//    @ApiOperation(value = "?????? ?????? ??????", notes = "?????? ?????? ??????????????? ????????????.")
//    @GetMapping(value = "/subscription/ships")
//    public ResponseEntity<List<ResponseSubShip>> getAllSubscriptionShips(){
//        log.info("?????? ???????????? ?????? API START");
//
//        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????
//
//        Iterable<SubscriptionShipsEntity> subscriptionShipsList = subscriptionService.getAllSubShips();
//
//        List<ResponseSubShip> responseSubShipList = new ArrayList<>();
//
//        subscriptionShipsList.forEach(v -> {
//            responseSubShipList.add(new ModelMapper().map(v, ResponseSubShip.class));
//        });
//
//        log.info("?????? ???????????? ?????? API END");
//
//        return ResponseEntity.status(HttpStatus.OK).body(responseSubShipList);
//    }

    @ApiOperation(value = "?????? ?????? ????????? ??????", notes = "?????? ???????????? ?????? ????????? ??????????????? ????????????.")
    @GetMapping(value = "/ships")
    public ResponseEntity<Page<ResponseSubShip>> getAllShips(@PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ?????? ?????? API START");

        Page<SubShipDto> shipDtoList = subscriptionService.getAllShips(pageRequest);
        Page<ResponseSubShip> responseShipList = shipDtoList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("?????? ?????? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }

    @ApiOperation(value = "?????? ??????+??????(?????????) ??? ????????? ??????", notes = "?????? ???????????? ?????? ????????? ??????+??????(?????????) ?????? ????????? ????????????.")
    @GetMapping(value = "/ships/status/{status}")
    public ResponseEntity<Page<ResponseSubShip>> getShipsByStatus(@PathVariable("status") Character status,
                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="startDate", required = false) LocalDate startDate,
                                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value="endDate", required = false) LocalDate endDate,
                                                                              @PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ??????+??????(?????????) ??? ????????? ?????? API START");

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

        log.info("?????? ??????+??????(?????????) ??? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }

    @ApiOperation(value = "?????? ??????(???????????????) ??? ????????? ????????? ??????", notes = "?????? ???????????? ?????? ????????? ?????? ??????(???????????????) ??? ????????? ????????? ????????????.")
    @GetMapping(value = "/ships/keyword/search")
    public ResponseEntity<Page<ResponseSubShip>> getShipsByUserIdContaining(@RequestParam(value = "searchType", required = false, defaultValue = "all") String searchType,
                                                                                        @RequestParam(value = "searchValue", required = false, defaultValue = "") String searchValue,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "startDate", required = false) LocalDate startDate,
                                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "endDate", required = false) LocalDate endDate,
                                                                                        @PageableDefault(size = 8, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ??????(?????????) ??? ????????? ????????? ?????? API START");

        // ????????? ????????? parameter ?????? ??????
        ShipsSearchParam shipsSearchParam = new ShipsSearchParam(searchType, searchValue, startDate, endDate);

        Page<SubShipDto> shipDtoList = subscriptionService.getShipsBySearchKeyword(shipsSearchParam, pageRequest);

        Page<ResponseSubShip> responseShipList = shipDtoList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("?????? ??????(?????????) ??? ????????? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }



    @ApiOperation(value = "?????? ??????", notes = "?????? ????????? ?????? ????????? ????????????.")
    @GetMapping(value = "/subscription/ships/{userId}")
    public ResponseEntity<List<ResponseSubShip>> getSubscriptionShips(@PathVariable("userId") String userId){
        log.info("???????????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        Iterable<SubscriptionShipsEntity> subscriptionShipsList = subscriptionService.getSubShips(userId);

        List<ResponseSubShip> responseSubShipList = new ArrayList<>();

        subscriptionShipsList.forEach(v -> {
            responseSubShipList.add(new ModelMapper().map(v, ResponseSubShip.class));
        });

        log.info("???????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseSubShipList);
    }

    @ApiOperation(value = "?????? ????????? ??????", notes = "?????? ????????? ?????? ????????? ????????? ????????????.")
    @GetMapping(value = "/ships/{userId}")
    public ResponseEntity<Page<ResponseSubShip>> getPagingShips(@PathVariable("userId") String userId,
                                                                      @PageableDefault(size = 4, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ????????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        Page<SubShipDto> shipsDtoList = subscriptionService.getSubPagingShips(userId, pageRequest);

        Page<ResponseSubShip> responseShipList = shipsDtoList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("?????? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }

    @ApiOperation(value = "?????? ??????+????????? ????????? ??????", notes = "?????? ????????? ?????? ????????? ????????? ????????? ????????????.")
    @GetMapping(value = "/ships/{userId}/{status}")
    public ResponseEntity<Page<ResponseSubShip>> getPagingByStatusShips(@PathVariable("userId") String userId,
                                                                        @PathVariable("status") String status,
                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "startDate", required = false) LocalDate startDate,
                                                                        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) @RequestParam(value = "endDate", required = false) LocalDate endDate,
                                                                @PageableDefault(size = 4, sort = "id", direction = Sort.Direction.DESC) Pageable pageRequest){
        log.info("?????? ????????? ????????? ?????? API START");

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT); // ????????? ??????

        Page<SubShipDto> shipsDtoList = subscriptionService.getSubPagingByStatusShips(userId, status, startDate, endDate, pageRequest);

        Page<ResponseSubShip> responseShipList = shipsDtoList.map(
                v -> new ModelMapper().map(v, ResponseSubShip.class)
        );

        log.info("?????? ????????? ????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(responseShipList);
    }

    @ApiOperation(value = "???????????? ???????????? ??????", notes = "?????? ??????????????? ??????????????? ????????????.")
    @PutMapping(value = "/subscription/ships/{shipId}")
    public ResponseEntity<String> updateSubShip(@PathVariable("shipId") Long shipId,
                                                @RequestParam(value="address") String address,
                                                @RequestParam(value="addressDetail") String addressDetail,
                                                @RequestParam(value="postcode") String postcode,
                                                @RequestParam(value="type") Character type,
                                                @RequestParam(value="dueDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueDate){
        log.info("???????????? ???????????? ?????? API START");

        subscriptionService.updateSubShip(shipId, postcode, address, addressDetail, dueDate, type);

        log.info("???????????? ???????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body("???????????? ???????????? ?????? ??????");
    }

    @ApiOperation(value = "????????? ??????", notes = "????????? ???????????? ????????????.")
    @GetMapping(value = "/subscription/revenue/{type}")
    public ResponseEntity<Long> getRevenue(@PathVariable("type") String type){
        log.info("????????? ?????? API START");

        Long revenue = 0L;

        // ?????? ?????????
        if(type.equals("total")) revenue = subscriptionService.getTotalRevenue();
        // ?????? ????????? (?????? : 1?????? ~ ??????)
        if(type.equals("recent")) revenue = subscriptionService.getRevenueMonth();
        // 1?????? ????????? (?????? : 2??????~1??????)
        if(type.equals("past")) revenue = subscriptionService.getRevenueMonthAgo();

        log.info("????????? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(revenue);
    }

    @ApiOperation(value = "?????? ??? ??????", notes = "????????? ???????????? ????????????.")
    @GetMapping(value = "/subscription/count/{type}")
    public ResponseEntity<Long> getSubscriptionCnt(@PathVariable("type") String type){
        log.info("?????? ??? ?????? API START");

        Long subscriptionCnt = 0L;

        // ?????? ?????? ???
        if(type.equals("total")) subscriptionCnt = subscriptionService.getTotalSubscriptionCnt();
        // ?????? ?????? ???
        if(type.equals("new")) subscriptionCnt = subscriptionService.getNewSubscriptionCnt();

        log.info("?????? ??? ?????? API END");

        return ResponseEntity.status(HttpStatus.OK).body(subscriptionCnt);
    }
}
