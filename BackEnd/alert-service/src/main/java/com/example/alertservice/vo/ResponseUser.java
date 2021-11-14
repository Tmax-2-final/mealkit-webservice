package com.example.alertservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseUser {

    private String email;
    private String name;
    private String userId;
    private Integer gender;
    private Date birth;
    private String oauth;
    private Integer subscribeYn;

    private Date createdAt;
    private Date modifiedAt;

}
