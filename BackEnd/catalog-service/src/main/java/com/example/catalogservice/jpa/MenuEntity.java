package com.example.catalogservice.jpa;


import com.example.catalogservice.vo.Children;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name="menu")
public class MenuEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int menuId;

    @Column(nullable = false, length = 40)
    private String name;

    @Column(nullable = false, length= 150)
    private String url;

    @OneToMany(targetEntity = ChildrenEntity.class)
    @JoinColumn(name = "menuId")
    private List<Children> children = new ArrayList<>();




}
