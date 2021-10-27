package com.example.catalogservice.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ResponseMyPackage {

    private Long patalogId;
    private String image;
    private String name;
    private Integer qty;
    private Long unitPrice;
    private Date createdAt;
    private Date modifiedAt;
}
