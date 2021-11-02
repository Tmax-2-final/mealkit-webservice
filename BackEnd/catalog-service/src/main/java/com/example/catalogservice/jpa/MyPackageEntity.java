package com.example.catalogservice.jpa;

import lombok.Data;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/*
create table carts (
  cart_id bigint not null primary key auto_increment,
  user_id varchar(50) not null,
  product_id BIGINT not null,
  qty INT default 1,
  unit_price BIGINT not null,
  created_at datetime default now(),
  modified_at datetime default now(),
  foreign key(user_id) references users(user_id)
);
 */
@Data
@Entity
@Table(name="mypackage")
public class MyPackageEntity implements Serializable {

//    @GeneratedValue(strategy = GenerationType.IDENTITY)


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long myPkgId;

    @Column
    private String userId;

    @Column
    private Long catalogId;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "catalogId", insertable = false, updatable = false)
    @JsonIgnore
    private CatalogEntity catalogEntity;

}
