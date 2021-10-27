package com.example.catalogservice.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MyPackageDto {

    private Long patalogId;
    private String userId;
    private Integer qty;
    private String image;
    private String name;
    private Long unitPrice;
    private Date createdAt;
    private Date modifiedAt;

    private Integer find;


}
