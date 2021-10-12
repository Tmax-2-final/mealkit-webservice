package com.example.orderservice.vo;

import lombok.Data;
import java.util.Date;

@Data
public class ResponseUser {

    private String email;
    private String name;
    private String userId;

    private Date createdAt;
    private Date modifiedAt;
}
