package com.example.subscriptionservice.jpa;

import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.querydsl.SubscriptionRespositoryQueryDsl;
import org.apache.tomcat.jni.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, Long>, SubscriptionRespositoryQueryDsl {
    SubscriptionEntity findByUserId(String userId);

    SubscriptionEntity findBySubId(long subId);

    Iterable<SubscriptionEntity> findByStatusAndNextPaymentDateLessThanEqual(Character status, LocalDateTime end);

    Long countByUserId(String userId);

    Page<SubscriptionEntity> findByStatus(Character status, Pageable pageRequest);

    Page<SubscriptionEntity> findByStatusAndStartDateBetween(Character status, LocalDateTime startDate, LocalDateTime endDate, Pageable pageRequest);

    Long countByStartDateBetween(LocalDateTime start, LocalDateTime end);


}
