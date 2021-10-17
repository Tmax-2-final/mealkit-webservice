package com.example.catalogservice.jpa;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="package")
public class PackageEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageId;

    @Column(nullable= false)
    private String url;

    @Column(nullable= false)
    private String name;

    @Column(nullable = false)
    private Long menuId;





}
