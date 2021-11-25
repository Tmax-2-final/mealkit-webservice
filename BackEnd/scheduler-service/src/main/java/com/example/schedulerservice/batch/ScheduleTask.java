package com.example.schedulerservice.batch;

import com.example.schedulerservice.client.AlertServiceClient;
import com.example.schedulerservice.client.SubscriptionServiceClient;
import com.example.schedulerservice.vo.RequestAlert;
import com.example.schedulerservice.vo.ResponseSubscription;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class ScheduleTask {

    CircuitBreakerFactory circuitBreakerFactory;
    SubscriptionServiceClient subscriptionServiceClient;
    AlertServiceClient alertServiceClient;

    @Autowired
    public ScheduleTask(CircuitBreakerFactory circuitBreakerFactory,
                        SubscriptionServiceClient subscriptionServiceClient,
                        AlertServiceClient alertServiceClient) {
        this.circuitBreakerFactory = circuitBreakerFactory;
        this.subscriptionServiceClient = subscriptionServiceClient;
        this.alertServiceClient = alertServiceClient;
    }

    // 매일 02시 0분 0초마다 실행
    @Scheduled(cron="0 0 14 * * ?")
    public void paymentSubscriptionCronJobSch() {
        log.info("Before call subscription-service paymentSubscription");
        List<ResponseSubscription> responseSubscriptionList = subscriptionServiceClient.paymentSubscription();
        log.info("After call subscription-service paymentSubscription");

        log.info("Before call alert-service sendAndSaveAlerts");
        for (ResponseSubscription responseSubscription: responseSubscriptionList) {
            RequestAlert requestAlert = new RequestAlert();
            requestAlert.setUserId(responseSubscription.getUserId());
            requestAlert.setType(202);
            requestAlert.setSubGradeName(responseSubscription.getSubscriptionGradeDto().getName());
            requestAlert.setPayPrice(responseSubscription.getSubscriptionGradeDto().getMonthlyFee().toString());

            Date nextPaymentDate = Timestamp.valueOf(responseSubscription.getNextPaymentDate());

            requestAlert.setPayDate(new Date());
            requestAlert.setNextPayDate(nextPaymentDate);

            // 구독 결제 메일 알람 발송 API
            alertServiceClient.sendAndSaveAlerts(requestAlert);
        }
        log.info("After call alert-service sendAndSaveAlerts");

        System.out.println("구독 결제 스케줄러 실행 완료");
        System.out.println("Scheduler time(paymentSubscriptionCronJobSch) : " + LocalDateTime.now());
    }
}
