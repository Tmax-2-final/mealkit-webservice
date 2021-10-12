package com.example.orderservice.controller;

import com.example.orderservice.client.CatalogServiceClient;
import com.example.orderservice.client.UserServiceClient;
import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.dto.OrderMgtDto;
import com.example.orderservice.entity.OrderEntity;
import com.example.orderservice.entity.OrderMgtEntity;
import com.example.orderservice.mq.KafkaProducer;
import com.example.orderservice.mq.OrderProducer;
import com.example.orderservice.service.OrderService;
import com.example.orderservice.vo.*;
import feign.FeignException;
import feign.Response;
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
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/")
public class OrderController {
    OrderService orderService;
    Environment env;
    KafkaProducer kafkaProducer;
    CatalogServiceClient catalogServiceClient;
    UserServiceClient userServiceClient;
    OrderProducer orderProducer;

    @Autowired
    public OrderController(OrderService orderService, Environment env, KafkaProducer kafkaProducer,
                           CatalogServiceClient catalogServiceClient, OrderProducer orderProducer,
                           UserServiceClient userServiceClient) {
        this.orderService = orderService;
        this.env = env;
        this.kafkaProducer = kafkaProducer;
        this.catalogServiceClient = catalogServiceClient;
        this.orderProducer = orderProducer;
        this.userServiceClient = userServiceClient;
    }

    @ApiOperation(value = "주문서비스 상태체크", notes = "주문서비스 상태체크를 한다")
    @GetMapping("/health_check")
    public String status(HttpServletRequest request){
        return String.format("It's Working in User Service," +
                        "port(local.server.port)=%s, port(server.port)=%s," +
                        "token_secret=%s, token_expiration_time=%s," +
                        "gateway_ip=%s, kafka_url=%s",
                env.getProperty("local.server.port"), env.getProperty("server.port"),
                env.getProperty("token.secret"), env.getProperty("token.expiration_time"), env.getProperty("gateway.ip"), env.getProperty("kafka.url"));
    }


    @ApiOperation(value = "주문 등록", notes = "결제 완료된 주문을 등록한다")
    @PostMapping(value = "/{userId}/orders")
    public ResponseEntity<String> createOrder(@PathVariable("userId") String userId, @RequestBody Map<String, Object> param){
        // ModelMapper 객체 생성 및 셋팅
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        // 주문 데이터 DTO에 담기
        OrderDto orderDto = modelMapper.map(param.get("orders"), OrderDto.class);
        orderDto.setUserId(userId);

        // 주문관리 데이터 DTO 리스트에 담기
        List<OrderMgtDto> orderMgtDtoList = new ArrayList<>();
        ArrayList arrayList = (ArrayList) param.get("order_mgt");
        for(int i =0; i< arrayList.size(); i++){
            OrderMgtDto orderMgtDto = modelMapper.map(arrayList.get(i), OrderMgtDto.class);
            orderMgtDtoList.add(orderMgtDto);
        }

        boolean isAvailable = true;

        ResponseCatalog responseCatalog = null;

        for (OrderMgtDto orderDetails: orderMgtDtoList) {
            // 카탈로그 서비스로부터 주문하려는 상품의 정보를 GET
            responseCatalog = catalogServiceClient.getCatalog(orderDetails.getProductId());
            if (responseCatalog != null && responseCatalog.getStock() - orderDetails.getQty() < 0)
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
                OrderDto createDto = orderService.createOrder(orderDto, orderMgtDtoList);

                // kafka 서버에 주문 관리 데이터 push
                kafkaProducer.send("example-catalog-topic", orderMgtDtoList);
            } catch (Exception ex){
                log.info("createOrder Error => " + ex.getMessage());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("시스템 에러");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("재고 수량 부족");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("주문 생성완료");
    }

    @ApiOperation(value = "주문상태 변경", notes = "주문상태를 변경한다 (1: 결제완료, 2: 배송준비중, 3: 배송중, 4: 배송완료)")
    @PutMapping(value = "/{userId}/orders")
    public ResponseEntity<ResponseOrder> updateOrderStatus(@PathVariable("userId") String userId, @RequestBody RequestUpdateOrderStatus orderDetails){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        OrderDto updateDto = orderService.updateOrderStatus(orderDetails.getOrderId(), orderDetails.getStatus());
        ResponseOrder responseOrder = modelMapper.map(updateDto, ResponseOrder.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseOrder);
    }

    @ApiOperation(value = "주문 삭제", notes = "해당하는 주문번호를 삭제한다")
    @DeleteMapping(value = "/{userId}/orders")
    public ResponseEntity<ResponseOrder> deleteOrder(@PathVariable("userId") String userId, @RequestBody RequestDeleteOrder orderDetails){
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        try {
            orderService.deleteOrder(orderDetails.getOrderId());
        } catch (Exception ex){
            log.info("deleteOrder Error => " + ex.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @ApiOperation(value = "회원 주문정보 조회", notes = "특정회원의 주문정보를 모두 조회한다")
    @GetMapping(value = "/{userId}/orders")
    public ResponseEntity<Iterable<OrderEntity>> getOrder(@PathVariable("userId") String userId) throws Exception {
        log.info("특정회원 주문조회 API START");
        Iterable<OrderEntity> orderList = orderService.getOrdersByUserId(userId);

        ResponseCatalog responseCatalog = null;

        // 특정 회원이 주문 상품명 Fegin Client 사용하여 맵핑
        for (OrderEntity orderEntity: orderList) {
            for(int i = 0; i < orderEntity.getOrdersMgt().size(); i++){
                responseCatalog = catalogServiceClient.getCatalog(orderEntity.getOrdersMgt().get(i).getProductId());
                orderEntity.getOrdersMgt().get(i).setName(responseCatalog.getName());
            }
        }

        log.info("특정 회원 주문조회 API END");
        return ResponseEntity.status(HttpStatus.OK).body(orderList);
    }

    @ApiOperation(value = "전체주문 조회", notes = "주문정보를 모두 조회한다")
    @GetMapping(value = "/orders")
    public ResponseEntity<Iterable<OrderEntity>> getAllOrders() throws Exception {
        log.info("Before retrieve AllOrders data");
        Iterable<OrderEntity> orderList = orderService.getAllOrders();

        ResponseUser responseUser = null;

        // open-feign Client - 유저서비스에 사용자 정보를 요청하여
        // OrderEntity에 email , name 셋팅
//        for (OrderEntity orderEntity : orderList) {
//            responseUser = userServiceClient.getUser(orderEntity.getUserId());
//            orderEntity.setEmail(responseUser.getEmail());
//            orderEntity.setName(responseUser.getName());
//        }

        log.info("After retrieve AllOrders data");

        return ResponseEntity.status(HttpStatus.OK).body(orderList);
    }

    /* 날짜별 유저 검색 */
    @ApiOperation(value = "날짜별 주문 검색", notes="날짜별 주문 검색")
    @PostMapping("/orders/date")
    public ResponseEntity<Iterable<OrderEntity>> getUsersByDate(@RequestBody RequestDate requestDate) {
        Iterable<OrderEntity> orderList = orderService.getOrderAllBetween(requestDate);

        ResponseUser responseUser = null;

        // open-feign Client - 유저서비스에 사용자 정보를 요청하여
        // OrderEntity에 email , name 셋팅
//        for (OrderEntity orderEntity : orderList) {
//            responseUser = userServiceClient.getUser(orderEntity.getUserId());
//            orderEntity.setEmail(responseUser.getEmail());
//            orderEntity.setName(responseUser.getName());
//        }

        return ResponseEntity.status(HttpStatus.OK).body(orderList);
    }
 }
