package com.example.alertservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseAlert {

    private Long id;
    private String userId;
    private Integer type;
    private String title;
    private String email;
    private Date createdAt;
}
