package com.example.catalogservice.vo;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Product {
    @JsonProperty("fullDescription")
    private String fulldescription;
    @JsonProperty("shortDescription")
    private String shortdescription;
    @JsonProperty("image")
    private List<String> image;
    @JsonProperty("variation")
    private List<Variation> variation;
    @JsonProperty("tag")
    private List<String> tag;
    @JsonProperty("category")
    private List<String> category;
    @JsonProperty("saleCount")
    private int salecount;
    @JsonProperty("rating")
    private int rating;
    @JsonProperty("new")
    private boolean THIS_IA_AN_INVALID_JAVA_IDENTIFIER_MANUALLY_RESOLVE_THE_ISSUE;//new;
    @JsonProperty("offerEnd")
    private String offerend;
    @JsonProperty("discount")
    private int discount;
    @JsonProperty("price")
    private double price;
    @JsonProperty("name")
    private String name;
    @JsonProperty("sku")
    private String sku;
    @JsonProperty("id")
    private String id;



}