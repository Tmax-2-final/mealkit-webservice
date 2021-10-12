package com.example.orderservice.client;

import com.example.orderservice.vo.ResponseCatalog;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "catalog-service")
public interface CatalogServiceClient {

    @GetMapping("/catalogs/{productId}")
    public ResponseCatalog getCatalog(@PathVariable Long productId);

}
