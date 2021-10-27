package com.example.subscriptionservice.service;

import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.vo.RequestUpdateSubscription;

public interface SubscriptionService {
    /*구독 등급 조회*/
    Iterable<SubscriptionGradeEntity>  getAllSubscriptionGrade();

    /*특정 구독 등급 조회*/
    SubscriptionGradeEntity getSubscriptionGrade(int subGradeId);

    /*구독 등록*/
    SubscriptionDto createSubscription(SubscriptionDto subscriptionDto);

    /*구독 변경*/
    void updateSubscription(SubscriptionDto subscriptionDto);

    /*구독 취소*/
    void cancelSubscription(SubscriptionDto subscriptionDto);

    /*구독 조회*/
    SubscriptionDto getSubscription(String userId);

    /*구독 결제*/
    void paymentSubscription();
}
