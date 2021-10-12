package com.example.userservice.client;

import com.example.userservice.entity.CatalogEntity;
import com.example.userservice.error.FeignErrorDecoder;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="catalog-service", configuration = FeignErrorDecoder.class)
public interface CatalogServiceClient {
    @GetMapping("/catalogs/{productId}")
    CatalogEntity getCatalog(@PathVariable Long productId);
}
