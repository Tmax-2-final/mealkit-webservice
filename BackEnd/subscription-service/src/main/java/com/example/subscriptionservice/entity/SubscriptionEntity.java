package com.example.subscriptionservice.entity;

import com.example.subscriptionservice.dto.SubscriptionGradeDto;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name="subscription")
public class SubscriptionEntity implements Serializable {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long subId;


    @Column(nullable = false, length = 50)
    private String userId;
    @Column(nullable = false, length = 50)
    private String subGradeId;
    @Column(nullable = false, insertable = false)
    private Character status;
    @Column(insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date lastPaymentDate;
    @Column
    private Date nextPaymentDate;

    @Column(updatable = false, insertable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date startDate;
    @Column
    private Date endDate;
    @Column
    private String cancelContent;

    // optional false = inner join
//    @ManyToOne(optional = false, fetch = FetchType.LAZY)
//    @JoinColumn(name = "sub_grade_id", nullable = false, updatable = false, insertable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "subGradeId", insertable = false, updatable = false)
    private SubscriptionGradeEntity subscriptionGradeEntity;
}