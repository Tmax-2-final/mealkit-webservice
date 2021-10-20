package com.example.subscriptionservice.service;

import com.example.subscriptionservice.entity.SubscriptionGradeEntity;

public interface SubscriptionService {
    /*구독 등급 조회*/
    Iterable<SubscriptionGradeEntity>  getAllSubscriptionGrade();
}
