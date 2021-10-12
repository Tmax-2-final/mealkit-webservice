package com.example.catalogservice.vo;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Variation {
        @JsonProperty("size")
        private List<Size> size;
        @JsonProperty("image")
        private String image;
        @JsonProperty("color")
        private String color;

        public List<Size> getSize() {
            return size;
        }

        public void setSize(List<Size> size) {
            this.size = size;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }
    }
