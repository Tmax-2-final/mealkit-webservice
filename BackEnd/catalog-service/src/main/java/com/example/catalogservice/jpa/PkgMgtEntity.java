package com.example.catalogservice.jpa;

import com.example.catalogservice.vo.Catalog;
import com.example.catalogservice.vo.PkgMgt;
import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "pkgMgt")
public class PkgMgtEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pkgMgtId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private Long patalogId;

    @Column(nullable = true)
    private Long catalogId;

    @Column(nullable = false, updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(nullable = false, insertable = false, updatable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "catalogId", insertable = false, updatable = false)
    @JsonIgnore
    private CatalogEntity catalogEntity;

}
