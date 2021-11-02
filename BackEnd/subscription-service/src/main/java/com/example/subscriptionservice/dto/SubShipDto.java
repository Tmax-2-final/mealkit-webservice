package com.example.subscriptionservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class SubShipDto implements Serializable {
    private Long id;
    private String userId;
    private Long pkgId;
    private String shipAddress;
    private Character status;
    private LocalDateTime startDate;
    private LocalDateTime dueDate;
    private Long price;
}
