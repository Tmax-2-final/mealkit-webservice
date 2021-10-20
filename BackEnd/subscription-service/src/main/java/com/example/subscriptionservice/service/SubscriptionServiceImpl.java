package com.example.subscriptionservice.service;

import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.jpa.SubscriptionGradeRepository;
import com.example.subscriptionservice.jpa.SubscriptionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SubscriptionServiceImpl implements SubscriptionService {
    SubscriptionGradeRepository subscriptionGradeRepository;
    Environment env;

    @Autowired
    public SubscriptionServiceImpl(SubscriptionGradeRepository subscriptionGradeRepository, Environment env) {
        this.subscriptionGradeRepository = subscriptionGradeRepository;
        this.env = env;
    }

    @Override
    public Iterable<SubscriptionGradeEntity> getAllSubscriptionGrade() {
        return subscriptionGradeRepository.findAll();
    }
}
