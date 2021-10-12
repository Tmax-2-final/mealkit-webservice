package com.example.orderservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class OrderDto implements Serializable {
    private String orderId;
    private String userId;
    private Integer postcode;
    private String address;
    private String addressDetail;
    private Integer totalPrice;
    private String status;
    private String payInfo;
    private String payment;
    private Date createdAt;
    private Date modifiedAt;
}
