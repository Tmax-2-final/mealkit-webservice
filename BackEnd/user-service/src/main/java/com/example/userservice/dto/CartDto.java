package com.example.userservice.dto;

import lombok.Data;
import java.util.Date;

@Data
public class CartDto {

    private Long cartId;
    private String userId;
    private Long productId;
    private Integer qty;
    private Long unitPrice;

    private Date createdAt;
    private Date modifiedAt;

    private Integer find;

}
