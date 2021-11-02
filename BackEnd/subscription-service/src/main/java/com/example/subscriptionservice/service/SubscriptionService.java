package com.example.subscriptionservice.service;

import com.example.subscriptionservice.dto.SubShipDto;
import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.vo.RequestCancelSubscription;
import com.example.subscriptionservice.vo.RequestUpdateSubscription;

public interface SubscriptionService {
    /*구독 등급 조회*/
    Iterable<SubscriptionGradeEntity>  getAllSubscriptionGrade();

    /*특정 구독 등급 조회*/
    SubscriptionGradeEntity getSubscriptionGrade(int subGradeId);

    /*구독 등록*/
    SubscriptionDto createSubscription(SubscriptionDto subscriptionDto);

    /*구독 재시작*/
    void restartSubscription(RequestUpdateSubscription requestUpdateSubscription);

    /*구독 변경*/
    void updateSubscription(SubscriptionDto subscriptionDto);

    /*구독 취소*/
    void cancelSubscription(RequestCancelSubscription requestCancelSubscription);

    /*구독 조회*/
    SubscriptionDto getSubscription(String userId);

    /*구독 결제*/
    void paymentSubscription();

    /*구독 여부확인*/
    long existSubscription(String userId);

    /*구독 배송 등록*/
    SubShipDto createSubShips(SubShipDto subShipDto);

    /*구독취소 하는 회원의 환불금액 조회*/
    Long getRefundAmount(String userId);

    /*환불회원의 배송 배송취소 처리 */
    void updateRefundCancelShips(String userId);
}
