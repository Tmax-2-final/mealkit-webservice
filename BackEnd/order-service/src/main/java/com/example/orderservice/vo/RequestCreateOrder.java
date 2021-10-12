package com.example.orderservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestCreateOrder {
    private Integer postcode;
    private String address;
    private String addressDetail;
    private Integer totalPrice;
    private String payInfo;
    private String payment;
}
