package com.example.userservice.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PrfrDto {
    private Long prfrId;
    private String userId;
    private Integer age;
    private String theme;
    private String flavor;
    private Integer cookingtime;

    private Date createdAt;
    private Date modifiedAt;
}
