package com.example.alertservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class RequestAlert {
    // 알림 코드
    private Integer code;
    // 유저 아이디
    private String userId;
    // 주문 번호
    private Long orderId;
    // 구독 등급명
    private String subGradeName;
    // 구독 주문 번호
    private Long subOrderId;
    // 결제금액
    private Integer payPrice;
    // 배송 번호
    private Long deliveryId;
    // 결제일
    private Date payDate;
    // 다음 결제 예정일
    private Date nextPayDate;
    // 배송 도착 예정일
    private Date deliveryDate;
    // 리뷰 작성 번호
    // private Long reviewsId;
}
