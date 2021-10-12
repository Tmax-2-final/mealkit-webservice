package com.example.userservice.vo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ResponseOrderTest {

    @Test
    void setTotalPrice() {
        ResponseOrder order = new ResponseOrder();

        order.setUnitPrice(50);
        order.setQty(10);
        Integer totalPrice = order.getUnitPrice() * order.getQty();
        order.setTotalPrice(totalPrice);
        // 검증하는 코드. 500원을 예상했고, getTotalPrice가 500원이면 true
        assertEquals(500, order.getTotalPrice());
    }

    @Test
    void setTotalPriceFail() {
        ResponseOrder order = new ResponseOrder();

        order.setUnitPrice(50);
        order.setQty(10);
        Integer totalPrice = order.getUnitPrice() * order.getQty();
        order.setTotalPrice(totalPrice);
        // 검증하는 코드. 500원을 예상했고, getTotalPrice가 500원이면 true
        assertNotEquals(1000, order.getTotalPrice());
    }
}