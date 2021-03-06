package com.example.subscriptionservice.dto;

import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SubscriptionDto implements Serializable {
    private Long subId;
    private Integer subGradeId;
    private Long subPkgId;
    private String userId;
    private Character status;
    private LocalDateTime lastPaymentDate;
    private LocalDateTime nextPaymentDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String cancelContent;
    private Integer changeSubGradeId;

    private SubscriptionGradeDto subscriptionGradeDto;
}
