package com.example.alertservice.service;

import com.example.alertservice.entity.AlertsEntity;
import com.example.alertservice.entity.MailAuthEntity;
import com.example.alertservice.entity.MailEntity;
import com.example.alertservice.jpa.AlertsRepository;
import com.example.alertservice.jpa.MailAuthRepository;
import com.example.alertservice.querydsl.AlertsSearchParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Service
@Transactional
public class AlertService {

    private final MailAuthRepository mailAuthRepository;
    private final AlertsRepository alertsRepository;

    @Autowired
    public AlertService(MailAuthRepository mailAuthRepository, AlertsRepository alertsRepository) {
        this.mailAuthRepository = mailAuthRepository;
        this.alertsRepository = alertsRepository;
    }

    // 유저 이메일과 인증코드 데이터 저장
    public void createMailAuth(String email, String code) {
        MailAuthEntity mailAuthEntity = new MailAuthEntity();
        mailAuthEntity.setEmail(email);
        mailAuthEntity.setCode(code);

        mailAuthRepository.save(mailAuthEntity);
    }
    // 유저 이메일과 인증코드 데이터 조회
    public boolean getUsersEmailAndAuthCode(String email, String code) {
        Optional<MailAuthEntity> mailAuthEntity = mailAuthRepository.findByEmailAndCode(email, code);
        // 존재한다면
        if(mailAuthEntity.isPresent()) {
            return true;
        }
        // 존재하지 않다면
        else {
            return false;
        }
    }
    // 유저 이메일 및 카카오톡 알림 발송 내역 저장
    public Long saveAlerts(Integer type, String userId, MailEntity mailEntity) {
        AlertsEntity alertsEntity = AlertsEntity.builder()
                .type(type)
                .userId(userId)
                .email(mailEntity.getAddress())
                .title(mailEntity.getTitle())
                .message(mailEntity.getTitle())
            .build();

        return alertsRepository.save(alertsEntity).getId();
    }

    // 알림 발송 내역 전체 조회
    public Page<AlertsEntity> getAllAlerts(Pageable pageRequest) {
        return alertsRepository.findAll(pageRequest);
    }

    // 알림 발송 내역 타입(코드) 별 전체 조회
    public Page<AlertsEntity> getAlertsByCode(Integer type, Pageable pageRequest) {
        return alertsRepository.findByType(type, pageRequest);
    }

    // 알림 발송 내역 특정 기간 내 타입(코드) 별 조회
    public Page<AlertsEntity> getAlertsByCodeAndCreatedAtBetween(Integer type, Date startDate, Date endDate, Pageable pageRequest) {
        return alertsRepository.findByTypeAndCreatedAtBetween(type, startDate, endDate, pageRequest);
    }

    // 알림 발송 내역 키워드 별 조회
    public Page<AlertsEntity> getAlertsBySearchKeyword(AlertsSearchParam alertsSearchParam, Pageable pageRequest) {
        return alertsRepository.findAllBySearchKeyword(alertsSearchParam, pageRequest);
    }
}
