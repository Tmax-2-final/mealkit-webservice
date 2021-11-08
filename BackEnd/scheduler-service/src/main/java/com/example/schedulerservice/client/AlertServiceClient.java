package com.example.schedulerservice.client;

import com.example.schedulerservice.error.FeignErrorDecoder;
import com.example.schedulerservice.vo.RequestAlert;
import com.example.schedulerservice.vo.ResponseSubscription;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Map;

@FeignClient(name="alert-service", configuration = FeignErrorDecoder.class)
public interface AlertServiceClient {
    // alert service 알람 발송
    @GetMapping("/alerts")
    Map<String, Integer> sendAndSaveAlerts(RequestAlert requestAlert);
}
