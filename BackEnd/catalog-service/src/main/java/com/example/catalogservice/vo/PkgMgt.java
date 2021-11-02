package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PkgMgt {
    @JsonProperty("pkgMgtId")
    private Long pkgMgtId;

    @JsonProperty("catalogId")
    private Long catalogId;

    @JsonProperty("userId")
    private String userId;


    public Long getPkgMgtId() {
        return pkgMgtId;
    }

    public void setPkgMgtId(Long pkgMgtId) {
        this.pkgMgtId = pkgMgtId;
    }


    public Long getCatalogId() {
        return catalogId;
    }

    public void setCatalogId(Long catalogId) {
        this.catalogId = catalogId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
