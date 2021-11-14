package com.example.subscriptionservice.querydsl;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ShipsSearchParam {
    private String searchType;
    private String searchValue;
    private LocalDate startDate;
    private LocalDate endDate;

    public ShipsSearchParam(String searchType, String searchValue, LocalDate startDate, LocalDate endDate) {
        this.searchType = searchType;
        this.searchValue = searchValue;

        if(startDate != null && endDate != null) {
            this.startDate = startDate;
            this.endDate = endDate;
        }
    }
}
