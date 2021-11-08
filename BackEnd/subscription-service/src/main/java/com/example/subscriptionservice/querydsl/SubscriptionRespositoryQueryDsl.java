package com.example.subscriptionservice.querydsl;

import com.example.subscriptionservice.entity.SubscriptionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SubscriptionRespositoryQueryDsl {
    Page<SubscriptionEntity> findAllBySearchKeyword(SubscriptionSearchParam subscriptionSearchParam, Pageable pageRequest);
    List<SubscriptionEntity> findAllBySearchKeyword(SubscriptionSearchParam subscriptionSearchParam);
}
