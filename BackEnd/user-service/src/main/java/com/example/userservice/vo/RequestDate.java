package com.example.userservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class RequestDate {
    private Date startDate;
    private Date endDate;
    private String searchData;
}