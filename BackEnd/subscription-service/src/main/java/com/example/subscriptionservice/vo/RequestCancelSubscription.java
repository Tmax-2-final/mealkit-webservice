package com.example.subscriptionservice.vo;

import lombok.Data;

@Data
public class RequestCancelSubscription {
    private String userId;
    private String cancelContent;
}
