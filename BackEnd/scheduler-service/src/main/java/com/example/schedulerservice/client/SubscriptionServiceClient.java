package com.example.schedulerservice.client;

import com.example.schedulerservice.error.FeignErrorDecoder;
import com.example.schedulerservice.vo.ResponseSubscription;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@FeignClient(name="subscription-service", configuration = FeignErrorDecoder.class)
public interface SubscriptionServiceClient {
    // subscription service 구독 결제
    @PutMapping("/subscription/payment")
    List<ResponseSubscription> paymentSubscription();
}
