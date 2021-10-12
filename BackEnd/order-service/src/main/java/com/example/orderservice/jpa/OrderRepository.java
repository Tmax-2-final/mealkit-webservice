package com.example.orderservice.jpa;

import com.example.orderservice.entity.OrderEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface OrderRepository extends CrudRepository<OrderEntity, Long> {

    OrderEntity findByOrderId(Long orderId);
    Iterable<OrderEntity> findByUserId(String userId);
    Iterable<OrderEntity> findAllByUserId(String userId);

    @Query(value = "select distinct c from OrderEntity c " +
            "join fetch c.ordersMgt " +
            "join fetch c.user ")
    Iterable<OrderEntity> findAll(Sort sort);

    Iterable<OrderEntity> findAllByCreatedAt(Date startDate, Sort sort);

    @Query(value = "select distinct c from OrderEntity c " +
            "join fetch c.ordersMgt " +
            "join fetch c.user " +
            "where c.createdAt between ?1 and ?2 ")
    Iterable<OrderEntity> findAllByCreatedAtBetween(Date startDate, Date endDate, Sort sort);

    @Query(value = "select distinct c from OrderEntity c " +
            "join fetch c.ordersMgt " +
            "join fetch c.user " +
            "where c.orderId = ?1 " +
            "and c.createdAt between ?2 and ?3 ")
    Iterable<OrderEntity> findAllByOrderIdAndCreatedAtBetween(Long orderId, Date startDate, Date endDate, Sort sort);



    void deleteByOrderId(Long orderId);
}


