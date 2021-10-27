package com.example.subscriptionservice.vo;

import lombok.Data;

@Data
public class ResponseSubscriptionGrade {
    private Integer subGradeId;
    private String name;
    private String enName;
    private Integer weeklyDeliveryQty;
    private Integer monthlyFee;
}
