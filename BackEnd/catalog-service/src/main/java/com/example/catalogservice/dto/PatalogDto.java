package com.example.catalogservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class PatalogDto implements Serializable {

    private Long patalogId;
    private String name;
    private String image;
    private Double rating;
    private String category;
    private Date createdAt;
    private Date modifiedAt;
}
