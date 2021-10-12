package com.example.userservice.client;

import com.example.userservice.entity.OrderEntity;
import com.example.userservice.error.FeignErrorDecoder;
import com.example.userservice.vo.ResponseOrder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

// order-service -> http://127.0.0.1:50002/{userId}/orders
@FeignClient(name="order-service", configuration = FeignErrorDecoder.class)
public interface OrderServiceClient {

    // order service 에 있는 주문 정보 조회를 요청
    @GetMapping("/{userId}/orders")
    Iterable<OrderEntity> getOrder(@PathVariable("userId") String userId);

    // 404 not found - 없는 페이지 url 을 일부로 요청했을 때, 로그에 추적되는지 확인
    @GetMapping("/{userId}/orders_ng")
    List<ResponseOrder> getOrdersNg(@PathVariable("userId") String userId);
}
