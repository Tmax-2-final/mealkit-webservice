package com.example.subscriptionservice.vo;

import lombok.Data;

@Data
public class RequestUpdateShips {
    Long[] ids;
    Character status;
}
