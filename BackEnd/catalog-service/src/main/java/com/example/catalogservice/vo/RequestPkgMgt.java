package com.example.catalogservice.vo;

import com.example.catalogservice.jpa.CatalogEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RequestPkgMgt {

    private Long pkgMgtId;

    private String userId;

    private Long patalogId;

    private Long catalogId;

    private Date createdAt;

    private Date modifiedAt;

    private List<Catalog> catalog = new ArrayList<>();



}
