package com.example.catalogservice.dto;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Data
public class CatalogDto implements Serializable {

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
