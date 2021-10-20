package com.example.catalogservice.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class PatalogDto implements Serializable {

    private Long patalogsId;
    private String name;
    private String image;
    private String details;
    private String publisher;
    private String author;
    private Integer unitPrice;
    private Double rating;
    private String category;
    private int stock;
    private Date createdAt;
    private Date modifiedAt;
}
