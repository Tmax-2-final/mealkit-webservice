package com.example.alertservice.querydsl;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
public class AlertsSearchParam {

    private String searchType;
    private String searchValue;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

}