package com.example.catalogservice.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Date;

@Data
public class CatalogDto implements Serializable {

    private Long productId;
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
