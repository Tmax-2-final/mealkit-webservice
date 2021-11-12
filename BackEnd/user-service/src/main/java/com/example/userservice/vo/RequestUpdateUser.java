package com.example.userservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class RequestUpdateUser {
    private String email;
    private String name;
    private String pwd;
    private String role;
    private Integer gender;
    private Date birth;
}
