package com.example.catalogservice.vo;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Blog {
        @JsonProperty("authorUrl")
        private String authorurl;
        @JsonProperty("author")
        private String author;
        @JsonProperty("url")
        private String url;
        @JsonProperty("title")
        private String title;
        @JsonProperty("category")
        private List<String> category;
        @JsonProperty("image")
        private String image;
        @JsonProperty("id")
        private int id;

    }