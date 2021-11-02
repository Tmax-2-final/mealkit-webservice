package com.example.userservice.jpa;

import com.example.userservice.entity.OAuthEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OAuthRepository extends JpaRepository<OAuthEntity, String> {

    Optional<OAuthEntity> findByUserId(String userId);
}
