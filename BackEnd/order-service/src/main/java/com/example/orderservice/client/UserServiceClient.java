package com.example.orderservice.client;

import com.example.orderservice.vo.ResponseCatalog;
import com.example.orderservice.vo.ResponseUser;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service")
public interface UserServiceClient {
        @GetMapping("/users/{userId}")
        public ResponseUser getUser(@PathVariable String userId);
}
