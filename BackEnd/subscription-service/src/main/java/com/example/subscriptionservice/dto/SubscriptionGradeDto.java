package com.example.subscriptionservice.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class SubscriptionGradeDto implements Serializable {
    private Integer subGradeId;
    private String name;
    private Integer weeklyDeliveryQty;
    private Integer monthlyFee;
}
