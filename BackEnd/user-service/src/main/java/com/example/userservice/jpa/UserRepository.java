package com.example.userservice.jpa;

import com.example.userservice.entity.CartEntity;
import com.example.userservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByUserId(String userId);
    UserEntity findByEmail(String email);
    UserEntity findByEmailAndName(String email, String username);
    Iterable<UserEntity> findAllByNameContainingAndCreatedAtBetween(String username, Date startDate, Date endDate);
}
