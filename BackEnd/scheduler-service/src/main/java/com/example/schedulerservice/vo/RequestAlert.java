package com.example.schedulerservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class RequestAlert {
    // 알림 코드
    private Integer type;
    // 유저 아이디
    private String userId;
    // oauth 유저인지 확인
    private String oauth;
    // 주문 번호
    private Long orderId;
    // 구독 등급명
    private String subGradeName;
    // 변경될 구독 등급 명
    private String subChangeGradeName;
    // 구독 주문 번호
    private Long subOrderId;
    // 결제금액
    private String payPrice;
    // 환불금액
    private String refundPrice;
    // 배송 번호
    private Long deliveryId;
    // 결제일
    private Date payDate;
    // 다음 결제 예정일
    private Date nextPayDate;
    // 배송 도착 예정일
    private Date deliveryDate;
    // 변경 예정일
    private Date changeDate;
    // 취소 날짜
    private Date cancelDate;
    // 리뷰 작성 번호
    // private Long reviewsId;
}
