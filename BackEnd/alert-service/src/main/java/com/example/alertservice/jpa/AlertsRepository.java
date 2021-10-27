package com.example.alertservice.jpa;

import com.example.alertservice.entity.AlertsEntity;
import com.example.alertservice.querydsl.AlertsRepositoryQueryDsl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface AlertsRepository extends JpaRepository<AlertsEntity, Long>, AlertsRepositoryQueryDsl {
    Page<AlertsEntity> findByType(Integer type, Pageable pageRequest);
    Page<AlertsEntity> findByTypeAndCreatedAtBetween(Integer type, Date startDate, Date endDate, Pageable pageRequest);
    Page<AlertsEntity> findByUserIdContainingAndCreatedAtBetween(String userId, Date startDate, Date endDate, Pageable pageRequest);
    Page<AlertsEntity> findByEmailContainingAndCreatedAtBetween(String email, Date startDate, Date endDate, Pageable pageRequest);
}
