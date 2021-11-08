package com.example.schedulerservice.vo;

import com.example.schedulerservice.dto.SubscriptionGradeDto;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class ResponseSubscription implements Serializable {
    private Long subId;
    private Integer subGradeId;
    private String userId;
    private Character status;
    private LocalDateTime lastPaymentDate;
    private LocalDateTime nextPaymentDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String cancelContent;

    private SubscriptionGradeDto subscriptionGradeDto;
}
