package com.example.subscriptionservice.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "subscription_ships")
public class SubscriptionShipsEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String userId;

    @Column(nullable = false)
    private Long pkgId;

    @Column(nullable = false, length = 200)
    private String shipAddress;

    @Column(nullable = false, insertable = false)
    private Character status;

    @Column
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime dueDate;

    @Column(nullable = false)
    private Long price;
}
