package com.example.orderservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseCatalog {
    private Long productId;
    private String name;
    private String image;
    private String detail;
    private String detailImg;
    private Integer pages;
    private Integer colSize;
    private Integer rowSize;
    private Integer heightSize;
    private Integer weight;
    private String publisher;
    private String author;
    private Integer stock;
    private Integer unitPrice;
}
