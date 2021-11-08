package com.example.userservice.entity;


/*
* Create table mydb.prfrs (
prfr_id BIGINT primary key auto_increment,
user_id VARCHAR(50) NOT NULL,
age int NOT NULL,
theme VARCHAR(50) NOT NULL,
flavor VARCHAR(50) NOT NULL,
cookingtime int NOT NULL,
created_at DATETIME default NOW(),
modified_at DATETIME default NULL,
);*/

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name="prfrs")
public class PrfrEntity implements Serializable{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long prfrId;

    @Column(nullable = false, length = 40)
    private String userId;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String theme;

    @Column(nullable = false)
    private String flavor;

    @Column(nullable = false)
    private Integer cookingtime;

    @Column(updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;


}
