package com.example.subscriptionservice.vo;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;

@Data
public class RequestSubShip {
    private Long id;
    private String userId;
    private Long pkgId;
    private String shipAddress;
    private Character status;
    private LocalDateTime startDate;
    private LocalDateTime dueDate;
    private Long price;
}