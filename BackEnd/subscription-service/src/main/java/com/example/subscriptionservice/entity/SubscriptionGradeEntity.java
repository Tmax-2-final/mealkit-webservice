package com.example.subscriptionservice.entity;

import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name="subscription_grade")
public class SubscriptionGradeEntity implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long subGradeId;

    @Column(nullable = false, length = 30)
    private String name;
    @Column(nullable = false, length = 30)
    private String enName;
    @Column(nullable = false)
    @ColumnDefault(value = "0")
    private Integer weeklyDeliveryQty;
    @Column(nullable = false)
    @ColumnDefault(value = "0")
    private Integer monthlyFee;
}
