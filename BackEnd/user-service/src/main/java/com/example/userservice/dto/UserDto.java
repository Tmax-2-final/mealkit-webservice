package com.example.userservice.dto;

import lombok.Data;

import java.util.Date;

/*
유저 - 주문 간 정보 교환
 */
@Data
public class UserDto {

    private String userId;
    private String email;
    private String name;
    private String pwd;
    private Integer gender;
    private Date birth;

    private String role;
    private String oauth;

    private Date createdAt;
    private Date modifiedAt;

    private String decryptedPwd;
    private String encryptedPwd;

}
