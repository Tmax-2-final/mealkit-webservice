package com.example.subscriptionservice.querydsl;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SubscriptionSearchParam {
    private String searchType;
    private String searchValue;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public SubscriptionSearchParam(String searchType, String searchValue, LocalDate startDate, LocalDate endDate) {
        this.searchType = searchType;
        this.searchValue = searchValue;

        if(startDate != null && endDate != null) {
            this.startDate = startDate.atStartOfDay();
            this.endDate = endDate.plusDays(1L).atStartOfDay();
        }
    }
}
