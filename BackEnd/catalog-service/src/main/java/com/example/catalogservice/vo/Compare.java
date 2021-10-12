package com.example.catalogservice.vo;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Compare {
        @JsonProperty("rating")
        private int rating;
        @JsonProperty("shortDescription")
        private String shortdescription;
        @JsonProperty("discount")
        private int discount;
        @JsonProperty("price")
        private double price;
        @JsonProperty("image")
        private List<String> image;
        @JsonProperty("name")
        private String name;
        @JsonProperty("id")
        private String id;


    }