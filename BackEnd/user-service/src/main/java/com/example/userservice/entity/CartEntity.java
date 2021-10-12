package com.example.userservice.entity;

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
@Table(name="carts")
public class CartEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @Column
    private String userId;

    @Column(unique = true)
    private Long productId;

    @Column
    private String name;

    @Column
    private String image;

    @Column
    @ColumnDefault(value = "1")
    private Integer qty;

    @Column
    private Long unitPrice;

    @Column(insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;
}
