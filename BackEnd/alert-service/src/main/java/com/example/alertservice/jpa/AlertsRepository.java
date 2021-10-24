package com.example.alertservice.jpa;

import com.example.alertservice.entity.AlertsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertsRepository extends JpaRepository<AlertsEntity, Long> {
}
