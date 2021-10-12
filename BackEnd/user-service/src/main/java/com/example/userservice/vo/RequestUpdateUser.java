package com.example.userservice.vo;

import lombok.Data;

@Data
public class RequestUpdateUser {
    private String email;
    private String name;
    private String pwd;
    private String role;
}
