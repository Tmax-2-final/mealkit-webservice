package com.example.orderservice.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/*
create table users (
	user_id varchar(50) not null primary key,
    email varchar(50) not null unique,
    name varchar(20) not null,
    role varchar(20) not null,
    encrypted_pwd varchar(120) not null,
    created_at datetime default now(),
    modified_at datetime default now()
);
 */
@Data
@Entity
@Table(name="users")
public class UserEntity {

    @Id
    private String userId;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(length = 20)
    private String role;

    @Column(nullable = false, unique = true)
    private String encryptedPwd;

    @Column(insertable = false, updatable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(insertable = false, updatable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;
}
