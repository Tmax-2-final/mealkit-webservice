package com.example.alertservice.service;

import com.example.alertservice.entity.MailAuthEntity;
import com.example.alertservice.jpa.MailAuthRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class AlertService {

    private final MailAuthRepository mailAuthRepository;

    @Autowired
    public AlertService(MailAuthRepository mailAuthRepository) {
        this.mailAuthRepository = mailAuthRepository;
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
}
