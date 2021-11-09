package com.example.subscriptionservice.service;

import com.example.subscriptionservice.dto.SubShipDto;
import com.example.subscriptionservice.dto.SubscriptionDto;
import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import com.example.subscriptionservice.entity.SubscriptionEntity;
import com.example.subscriptionservice.entity.SubscriptionGradeEntity;
import com.example.subscriptionservice.entity.SubscriptionShipsEntity;
import com.example.subscriptionservice.querydsl.ShipsSearchParam;
import com.example.subscriptionservice.querydsl.SubscriptionSearchParam;
import com.example.subscriptionservice.vo.RequestCancelSubscription;
import com.example.subscriptionservice.vo.RequestUpdateShips;
import com.example.subscriptionservice.vo.RequestUpdateSubscription;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface SubscriptionService {
    /*구독 등급 조회*/
    Iterable<SubscriptionGradeEntity>  getAllSubscriptionGrade();

    /*특정 구독 등급 조회*/
    SubscriptionGradeDto getSubscriptionGrade(Integer subGradeId);

    /*구독 등록*/
    SubscriptionDto createSubscription(SubscriptionDto subscriptionDto);

    /*구독 재시작*/
    void restartSubscription(RequestUpdateSubscription requestUpdateSubscription);

    /*구독 변경*/
    void updateSubscription(SubscriptionDto subscriptionDto);

    /*구독 취소*/
    void cancelSubscription(RequestCancelSubscription requestCancelSubscription);

    /*구독 페이징 조회*/
    Page<SubscriptionDto> getAllSubscription(Pageable pageRequest);

    Page<SubscriptionDto> getSubscriptionByStatus(Character status, Pageable pageRequest);

    Page<SubscriptionDto> getSubscriptionByStatusAndStartDateBetween(Character status, LocalDate startDate, LocalDate endDate, Pageable pageRequest);

    Page<SubscriptionDto> getSubscriptionBySearchKeyword(SubscriptionSearchParam subscriptionSearchParam, Pageable pageReqeust);

    /*구독 조회*/
    SubscriptionDto getSubscription(String userId);

    /*구독 결제*/
    Iterable<SubscriptionDto>  paymentSubscription();

    /*구독 여부확인*/
    long existSubscription(String userId);

    /*배송 등록*/
    SubShipDto createShips(SubShipDto subShipDto);

    /*배송 상태 변경*/
    List<SubShipDto> updateShipsStatus(RequestUpdateShips requestUpdateShips);

    /*배송 페이징 조회*/
    Page<SubShipDto> getAllShips(Pageable pageRequest);

    Page<SubShipDto> getShipsByStatus(Character status, Pageable pageRequest);

    Page<SubShipDto> getShipsByStatusAndStartDateBetween(Character status, LocalDate startDate, LocalDate endDate, Pageable pageRequest);

    Page<SubShipDto> getShipsBySearchKeyword(ShipsSearchParam shipsSearchParam, Pageable pageReqeust);

    /*전체 구독 배송 조회*/
    Iterable<SubscriptionShipsEntity>  getAllSubShips();

    /*구독 배송 조회*/
    Iterable<SubscriptionShipsEntity>  getSubShips(String userId);

    /*구독 배송정보 변경*/
    void  updateSubShip(Long shipId, String postcode, String address, String addressDetail, LocalDate dueDate, Character type);

    /*구독취소 하는 회원의 환불금액 조회*/
    Long getRefundAmount(String userId);

    /*환불회원의 배송 배송취소 처리 */
    void updateRefundCancelShips(String userId);

    /*구독패키지 확정*/
    void confirmSubPkg(String userId, Long pkgId);

    /*한달전 매출액 조회*/
    Long getRevenueMonthAgo();

    /*한달간 매출액 조회*/
    Long getRevenueMonth();

    /*총 매출액 조회*/
    Long getTotalRevenue();

    Long getTotalSubscriptionCnt();

    Long getNewSubscriptionCnt();
}
