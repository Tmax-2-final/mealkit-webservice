package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestCatalog {

    private Long catalogId;

    private String name;

    private String image1;

    private String image2;

    private String image3;

    private String image4;

    private String summaryImg;

    private String detailImg;

    private String details;

    private Integer unitPrice;

    private Double rating;

    private String category;

    private Integer stock;


}
