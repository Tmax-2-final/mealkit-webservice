package com.example.subscriptionservice.dto;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SubShipDto implements Serializable {
    private Long id;
    private String userId;
    private Long pkgId;
    private String pkgName;
    private String postcode;
    private String address;
    private String addressDetail;
    private Character type;
    private Character status;
    private LocalDateTime startDate;
    private LocalDate dueDate;
    private Long price;
}
