package com.example.subscriptionservice.vo;

import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

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
