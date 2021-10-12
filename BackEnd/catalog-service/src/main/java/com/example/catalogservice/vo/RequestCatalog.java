package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestCatalog {

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
