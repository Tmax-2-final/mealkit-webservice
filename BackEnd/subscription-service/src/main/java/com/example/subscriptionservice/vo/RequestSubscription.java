package com.example.subscriptionservice.vo;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Data
public class RequestSubscription implements Serializable {
    private Long subId;
    private Integer subGradeId;
    private String userId;
    private String status;
    private LocalDateTime lastPaymentDate;
    private LocalDateTime nextPaymentDate;
    private LocalDateTime startDate;
}
