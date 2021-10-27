package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestMyPackage {

    private String name;

    private Long patalogId;

    private Integer qty;

    private Long unitPrice;

    private String image;
}
