package com.example.subscriptionservice.querydsl;

import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ShipsRespositoryQueryDsl {
    Page<SubscriptionShipsEntity> findAllBySearchKeyword(ShipsSearchParam shipsSearchParam, Pageable pageRequest);
    List<SubscriptionShipsEntity> findAllBySearchKeyword(ShipsSearchParam shipsSearchParam);
}
