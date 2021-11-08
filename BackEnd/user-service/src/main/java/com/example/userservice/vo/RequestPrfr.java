package com.example.userservice.vo;

import lombok.Data;

@Data
public class RequestPrfr {
    private Long prfrId;
    private String userId;
    private Integer age;
    private String theme;
    private String flavor;
    private Integer cookingtime;
}
