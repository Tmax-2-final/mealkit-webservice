package com.example.catalogservice.dto;

import com.example.catalogservice.jpa.CatalogEntity;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
public class PkgMgtDto implements Serializable {

    private Long pkgMgtId;

    private String userId;

    private Long patalogId;

    private Long catalogId;

}
