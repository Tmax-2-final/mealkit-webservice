package com.example.schedulerservice.batch;

import com.example.schedulerservice.client.SubscriptionServiceClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
public class ScheduleTask {

    CircuitBreakerFactory circuitBreakerFactory;
    SubscriptionServiceClient subscriptionServiceClient;

    @Autowired
    public ScheduleTask(CircuitBreakerFactory circuitBreakerFactory, SubscriptionServiceClient subscriptionServiceClient) {
        this.circuitBreakerFactory = circuitBreakerFactory;
        this.subscriptionServiceClient = subscriptionServiceClient;
    }

    // 매일 14시 0분 0초마다 실행
    @Scheduled(cron="30 * * * * ?")
    public void paymentSubscriptionCronJobSch() {
        log.info("Before call subscription-service paymentSubscription");
        subscriptionServiceClient.paymentSubscription();
        log.info("After call subscription-service paymentSubscription");

        System.out.println("구독 결제 스케줄러 실행 완료");
        System.out.println("Scheduler time(paymentSubscriptionCronJobSch) : " + LocalDateTime.now());
    }
}
