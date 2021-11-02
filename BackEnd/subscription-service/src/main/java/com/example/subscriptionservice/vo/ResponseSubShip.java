package com.example.subscriptionservice.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseSubShip {
    private Long id;
    private String userId;
    private Long pkgId;
    private String shipAddress;
    private Character status;
    private LocalDateTime startDate;
    private LocalDateTime dueDate;
    private Long price;
}
