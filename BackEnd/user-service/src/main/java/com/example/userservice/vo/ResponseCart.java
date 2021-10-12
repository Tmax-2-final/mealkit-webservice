package com.example.userservice.vo;

import lombok.Data;
import java.util.Date;

@Data
public class ResponseCart {

    private Long cartId;
    private Long productId;
    private String image;
    private String name;
    private Integer qty;
    private Long unitPrice;
    private Date createdAt;
    private Date modifiedAt;
}
