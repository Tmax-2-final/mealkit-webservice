package com.example.alertservice.entity;

import lombok.Data;

@Data
public class MailEntity {

    private String address;
    private String title;
    private String message;
}
