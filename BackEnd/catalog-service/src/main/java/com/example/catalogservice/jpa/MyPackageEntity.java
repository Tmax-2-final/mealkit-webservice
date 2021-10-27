package com.example.catalogservice.jpa;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
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
public class MyPackageEntity {

//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column
    private Long patalogId;

    @Column
    private String userId;

    @Column
    private String name;

    @Column
    private String image;

    @Column
    @ColumnDefault(value = "1")
    private Integer qty;

    @Column
    private Long unitPrice;

    @Column(nullable = false, updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(nullable = false, insertable = false, updatable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;
}
