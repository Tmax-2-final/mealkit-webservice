package com.example.subscriptionservice.client;

import com.example.subscriptionservice.vo.ResponseCatalog;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "catalog-service")
public interface CatalogServiceClient {

    @GetMapping("/catalogs/{productId}")
    public ResponseCatalog getCatalog(@PathVariable Long productId);

}
