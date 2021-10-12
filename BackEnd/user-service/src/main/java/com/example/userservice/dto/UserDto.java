package com.example.userservice.dto;

import com.example.userservice.entity.OrderEntity;
import com.example.userservice.vo.ResponseCart;
import com.example.userservice.vo.ResponseOrder;
import lombok.Data;

import java.util.Date;
import java.util.List;
/*
유저 - 주문 간 정보 교환
 */
@Data
public class UserDto {

    private String userId;
    private String email;
    private String name;
    private String pwd;
    private String role;

    private Date createdAt;
    private Date modifiedAt;

    private String decryptedPwd;
    private String encryptedPwd;

    private Iterable<OrderEntity> orders;
}
