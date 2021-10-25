package com.example.subscriptionservice.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

@Data
public class RequestSubscription implements Serializable {
    private Long subId;
    private Integer subGradeId;
    private String userId;
    private String status;
    private Date lastPaymentDate;
    private Date nextPaymentDate;
    private Date startDate;
}
