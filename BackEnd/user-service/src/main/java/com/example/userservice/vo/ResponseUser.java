package com.example.userservice.vo;

import com.example.userservice.entity.OrderEntity;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ResponseUser {

    private String email;
    private String name;
    private String userId;
    private Integer gender;
    private Date birth;
    private String oauth;

    private Date createdAt;
    private Date modifiedAt;

}
