package com.example.subscriptionservice.jpa;

import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface SubscriptionShipsRepository extends JpaRepository<SubscriptionShipsEntity, Long> {
    // 환불 요청한 회원의 상품준비중 상태만 환불금액 계산
    @Query("SELECT sum(s.price) from SubscriptionShipsEntity s where s.userId = ?1 and s.status = '1'")
    Long getRefundAmountByUserId(String userId);

    //환불 요청한 회원의 상품준비중 이외의 배송들 배송취소 상태로 변경
    @Query("SELECT sum(s.price) from SubscriptionShipsEntity s where s.userId = ?1 and s.status = '1'")
    Long updateRefundCancelShips(String userId);

    Iterable<SubscriptionShipsEntity> findByUserId(String userId);

}
