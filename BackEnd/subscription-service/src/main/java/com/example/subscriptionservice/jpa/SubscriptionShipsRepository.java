package com.example.subscriptionservice.jpa;

import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import com.example.subscriptionservice.querydsl.ShipsRespositoryQueryDsl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface SubscriptionShipsRepository extends JpaRepository<SubscriptionShipsEntity, Long>, ShipsRespositoryQueryDsl {
    // 환불 요청한 회원의 상품준비중 상태만 환불금액 계산
    @Query("SELECT COALESCE(sum(s.price),0) from SubscriptionShipsEntity s where s.userId = ?1 and s.status = '1'")
    Long getRefundAmountByUserId(String userId);

    //환불 요청한 회원의 상품준비중 이외의 배송들 배송취소 상태로 변경
    //Long updateRefundCancelShips(String userId);

    Iterable<SubscriptionShipsEntity> findByUserId(String userId);

    // 배송완료(5)만 매출액에 포함
    @Query("SELECT COALESCE(sum(s.price), 0) from SubscriptionShipsEntity s where s.status = '5' and s.dueDate between ?1 and ?2")
    Long getRevenueBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    // 배송완료(5)만 매출액에 포함
    @Query("SELECT COALESCE(sum(s.price), 0) from SubscriptionShipsEntity s where s.status = '5'")
    Long getTotalRevenue();

    Page<SubscriptionShipsEntity> findByStatus(Character status, Pageable pageRequest);

    Page<SubscriptionShipsEntity> findByStatusAndDueDateBetween(Character status, LocalDate startDate, LocalDate endDate, Pageable pageRequest);

    @Query("select s from SubscriptionShipsEntity s where s.id in :idList")
    Iterable<SubscriptionShipsEntity> findShipIn(Long[] idList);

    Page<SubscriptionShipsEntity> findByUserId(String userId, Pageable pageRequest);
}
