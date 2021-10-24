package com.example.alertservice.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

/*
create table alerts (
	id bigint auto_increment not null primary key,
    user_id varchar(50),
    email varchar(50) not null,
    type int not null,
    title varchar(100) not null,
    message varchar(300) not null,
    created_at datetime default now(),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);
 */
@Getter
@NoArgsConstructor
@Entity
@Table(name="alerts")
public class AlertsEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer type;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 300, nullable = false)
    private String message;

    @Column(insertable = false, updatable = false)
    @ColumnDefault(value = "CURRENT_TIMESTAMP")
    private Date createdAt;

    // 유저 테이블 userId 참조키
    @Column(length = 50, nullable = false)
    private String userId;

    @Column(length = 50, nullable = false)
    private String email;

    @Builder
    public AlertsEntity(Integer type, String title, String message, String userId, String email) {
        this.type = type;
        this.title = title;
        this.message = message;
        this.userId = userId;
        this.email = email;
    }
}
