package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestPatalog {

    private String name;
    private String image;
    private String details;
    private String publisher;
    private String author;
    private Integer unitPrice;
    private String category;
    private Double rating;
    private int stock;


}
