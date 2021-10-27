package com.example.schedulerservice.client;

import com.example.schedulerservice.error.FeignErrorDecoder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name="subscription-service", configuration = FeignErrorDecoder.class)
public interface SubscriptionServiceClient {

    // subscription service 구독 결제
    @GetMapping("/subscription/payment")
    void paymentSubscription();
}
