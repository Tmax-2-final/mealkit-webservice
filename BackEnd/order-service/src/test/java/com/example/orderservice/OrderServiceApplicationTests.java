package com.example.orderservice;

import com.example.orderservice.entity.OrderEntity;
import com.example.orderservice.service.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

@SpringBootTest
class OrderServiceApplicationTests {

    OrderService orderService;

    @Autowired
    public OrderServiceApplicationTests(OrderService orderService) {
        this.orderService = orderService;
    }

    @Test
    void contextLoads() {
    }

    @Test
    @Transactional
    public void 주문내역(){
        long start = System.currentTimeMillis();
        System.out.println("@@@ getOgExByMemberId 시작");

        Iterable<OrderEntity> ogList = orderService.getAllOrders();

        System.out.println(ogList);

        long end = System.currentTimeMillis();
        System.out.println("@@@ getOgExByMemberId 완료 실행 시간 : " + (end - start) / 1000.0);
    }
}
