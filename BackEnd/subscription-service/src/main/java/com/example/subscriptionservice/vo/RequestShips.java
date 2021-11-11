package com.example.subscriptionservice.vo;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class RequestShips {
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

    Iterable<RequestCatalog> requestCatalogList;
}
