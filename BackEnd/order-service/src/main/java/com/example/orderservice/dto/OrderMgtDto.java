package com.example.orderservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class OrderMgtDto implements Serializable {
    private Long orderMgtId;
    private Long orderId;
    private Long productId;
    private Integer qty;
    private Long unitPrice;
    private Date createdAt;
    private Date modifiedAt;
}
