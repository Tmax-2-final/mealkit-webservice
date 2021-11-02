package com.example.catalogservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponsePkgMgt {

    private Long pkgMgtId;
    private Long patalogId;
    private Long catalogId;
    private String userId;
    private Date createdAt;
    private Date modifiedAt;

}
