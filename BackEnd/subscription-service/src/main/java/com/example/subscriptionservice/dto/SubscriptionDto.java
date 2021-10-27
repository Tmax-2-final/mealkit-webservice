package com.example.subscriptionservice.dto;

import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

@Data
public class SubscriptionDto implements Serializable {
    private Long subId;
    private Integer subGradeId;
    private String userId;
    private Character status;
    private Date lastPaymentDate;
    private Date nextPaymentDate;
    private Date startDate;
    private Date endDate;
    private String cancelContent;

    private SubscriptionGradeDto subscriptionGradeDto;
}
