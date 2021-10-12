package com.example.orderservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class RequestDate {
    private Date startDate;
    private Date endDate;
    private Long searchData;
}