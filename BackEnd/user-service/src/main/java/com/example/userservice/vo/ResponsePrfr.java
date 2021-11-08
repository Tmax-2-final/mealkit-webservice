package com.example.userservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ResponsePrfr {
    private Long prfrId;
    private String userId;
    private Integer age;
    private String theme;
    private String flavor;
    private Integer cookingtime;

    private Date createdAt;
    private Date modifiedAt;
}
