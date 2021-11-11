package com.example.subscriptionservice.client;


import com.example.subscriptionservice.error.FeignErrorDecoder;
import com.example.subscriptionservice.vo.RequestAlert;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@FeignClient(name="alert-service", configuration = FeignErrorDecoder.class)
public interface AlertServiceClient {
    // alert service 알람 발송
    @GetMapping("/alerts")
    Map<String, Integer> sendAndSaveAlerts(RequestAlert requestAlert);
}
