package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

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

    private String flavor;

    private int cookingtime;

    private String summaryImg;

    private String detailImg;

    private String details;

    private Double rating;

    private String category;

    private Integer stock;

}
