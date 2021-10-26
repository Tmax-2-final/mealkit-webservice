package com.example.alertservice.querydsl;

import com.example.alertservice.entity.AlertsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlertsRepositoryQueryDsl {

    Page<AlertsEntity> findAllBySearchKeyword(AlertsSearchParam alertsSearchParam, Pageable pageRequest);
    List<AlertsEntity> findAllBySearchKeyword(AlertsSearchParam alertsSearchParam);
}
