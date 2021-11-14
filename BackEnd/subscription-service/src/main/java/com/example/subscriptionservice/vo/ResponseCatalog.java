package com.example.subscriptionservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseCatalog {

    private Long catalogId;

    private String name;

    private String image1;

    private String image2;

    private String image3;

    private String image4;

    private Integer age;

    private String theme;

    private String flavor;

    private int cookingtime;

    private String summaryImg;

    private String detailImg;

    private String details;

    private Integer unitPrice;

    private Double rating;

    private String category;

    private Integer stock;

}
