package com.example.orderservice.jpa;

import com.example.orderservice.entity.OrderMgtEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface OrderMgtRepository extends CrudRepository<OrderMgtEntity, Long> {
    void deleteByOrderId(Long orderId);

}
