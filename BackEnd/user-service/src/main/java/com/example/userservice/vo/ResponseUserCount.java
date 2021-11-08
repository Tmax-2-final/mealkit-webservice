package com.example.userservice.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseUserCount {
    private Long newUser;
    private Long totalUser;
}
