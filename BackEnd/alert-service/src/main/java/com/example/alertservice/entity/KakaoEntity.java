package com.example.alertservice.entity;

import lombok.Data;

@Data
public class KakaoEntity {

    private String template_id;
    private String access_token;
    private String userId;

}
