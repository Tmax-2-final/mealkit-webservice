package com.example.catalogservice.jpa;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="children")
public class ChildrenEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long childId;

    @Column(nullable= false)
    private String url;

    @Column(nullable= false)
    private String name;

    @Column(nullable = false)
    private Long menuId;





}
