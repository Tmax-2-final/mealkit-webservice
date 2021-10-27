package com.example.subscriptionservice.jpa;

import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDateTime;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, Long> {
    SubscriptionEntity findByUserId(String userId);

    SubscriptionEntity findBySubId(long subId);

    Iterable<SubscriptionEntity> findByNextPaymentDateBetween(LocalDateTime start, LocalDateTime end);
}
