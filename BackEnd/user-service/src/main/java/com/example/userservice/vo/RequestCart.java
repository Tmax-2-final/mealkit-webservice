package com.example.userservice.vo;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestCart {

    @NotNull(message = "Name cannot be null")
    private Long productId;

    @NotNull(message = "Name cannot be null")
    private Integer qty;

    @NotNull(message = "Name cannot be null")
    private Long unitPrice;
}
