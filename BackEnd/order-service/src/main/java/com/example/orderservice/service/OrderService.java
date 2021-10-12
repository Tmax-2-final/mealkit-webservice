package com.example.orderservice.service;

import com.example.orderservice.dto.OrderDto;
import com.example.orderservice.dto.OrderMgtDto;
import com.example.orderservice.entity.OrderEntity;
import com.example.orderservice.vo.RequestDate;

import java.util.List;

public interface OrderService {
    /* 주문 하기 */
    OrderDto createOrder(OrderDto orderDetails, List<OrderMgtDto> orderMgtDtoList) throws Exception;

    /* 특정 주문번호의 주문 상태 변경 */
    OrderDto updateOrderStatus(Long orderId, String status);

    /* 특정 주문번호의 주문 취소 */
    void deleteOrder(Long orderId) throws Exception;

    /* 특정 주문번호의 주문 조회 */
    OrderDto getOrderByOrderId(Long orderId);

    /* 특정 회원의 주문 조회 */
    Iterable<OrderEntity> getOrdersByUserId(String userId);

    /* 전체 주문 조회 */
    Iterable<OrderEntity> getAllOrders();

    /* 날짜 주문 조회 */
    Iterable<OrderEntity> getOrderAllBetween(RequestDate requestDate);
}
