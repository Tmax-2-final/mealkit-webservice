package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponsePatalog {

    private Long patalogId;
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
