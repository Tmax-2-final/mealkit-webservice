package com.example.alertservice.entity;

import lombok.Data;

import javax.persistence.*;

/*
create table mailauths (
	id bigint auto_increment not null primary key,
    email varchar(30) not null,
    code varchar(10) not null
);
 */
@Data
@Entity
@Table(name="mailauths")
public class MailAuthEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String email;

    @Column
    private String code;
}
