package com.example.alertservice.jpa;

import com.example.alertservice.entity.MailAuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MailAuthRepository extends JpaRepository<MailAuthEntity, Long> {
    /* 유저 이메일과 인증코드가 일치하는 데이터 조회 */
    Optional<MailAuthEntity> findByEmailAndCode(String email, String code);
}
