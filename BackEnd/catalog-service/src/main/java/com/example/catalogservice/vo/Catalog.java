package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Catalog {

    @JsonProperty("name")
    private String name;

    @JsonProperty("image")
    private String image;

    @JsonProperty("details")
    private String details;

    @JsonProperty("publisher")
    private String publisher;

    @JsonProperty("author")
    private String author;

    @JsonProperty("unitPrice")
    private Integer unitPrice;

    @JsonProperty("rating")
    private Double rating;

    @JsonProperty("category")
    private String category;

    @JsonProperty("stock")
    private int stock;


}
