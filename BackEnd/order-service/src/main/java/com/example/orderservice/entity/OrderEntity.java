package com.example.orderservice.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name="orders")
public class OrderEntity implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false, length = 40)
    private String userId;
    @Column(nullable = false, length = 40)
    private Integer postcode;
    @Column(nullable = false, length = 150)
    private String address;
    @Column(nullable = false, length = 150)
    private String addressDetail;
    @Column(nullable = false)
    @ColumnDefault(value = "0")
    private Integer totalPrice;
    @Column(length = 1, insertable = false)
    @ColumnDefault(value = "1")
    private String status;
    @Column(length = 50)
    private String payInfo;
    @Column(nullable = false, length = 1)
    private String payment;

    @Column(updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;
    @Column(insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date modifiedAt;

    @OneToMany(targetEntity = OrderMgtEntity.class)
    @JoinColumn(name = "orderId")
    private List<OrderMgtEntity> ordersMgt = new ArrayList<>();

    @OneToOne(targetEntity = UserEntity.class)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private UserEntity user;

    // userEntity 정보 (open feign)
    @Access(AccessType.PROPERTY)
    private String email;
    @Access(AccessType.PROPERTY)
    private String name;

    /*@Column(nullable = false)
    private String instanceId;*/
}

