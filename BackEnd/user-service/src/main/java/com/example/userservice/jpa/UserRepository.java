package com.example.userservice.jpa;


import com.example.userservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    UserEntity findByUserId(String userId);
    UserEntity findByEmail(String email);
    UserEntity findByEmailAndName(String email, String username);
    Iterable<UserEntity> findAllByNameContainingAndCreatedAtBetween(String username, Date startDate, Date endDate);

    @Query(value = "select u.email from UserEntity u where u.userId = ?1")
    String findEmailByUserId(String userId);

    @Query(value = "select u.oauth from UserEntity u where u.userId = ?1")
    String findOauthByUserId(String userId);

}
