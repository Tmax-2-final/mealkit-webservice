package com.example.catalogservice.jpa;

import com.example.catalogservice.vo.Children;
import com.example.catalogservice.vo.PkgMgt;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "patalogs")
public class PatalogEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patalogId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String image;

    @Column(nullable = true)
    private Double rating;

    @Column(nullable = true)
    private String category;

    @Column(nullable = false, updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(nullable = false, insertable = false, updatable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;

    @OneToMany(targetEntity = PkgMgtEntity.class)
    @JoinColumn(name = "patalogId")
    private List<PkgMgt> pkgMgt = new ArrayList<>();
}
