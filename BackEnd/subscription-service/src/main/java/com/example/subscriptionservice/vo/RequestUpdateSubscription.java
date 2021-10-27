package com.example.subscriptionservice.vo;

import lombok.Data;

@Data
public class RequestUpdateSubscription {
    Long subId;
    Integer subGradeId;
    String userId;
}
