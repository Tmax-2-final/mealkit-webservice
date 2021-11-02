package com.example.userservice.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

/*
create table oauths (
	user_id varchar(50),
    access_token varchar(100),
    expires_in int,
    refresh_token varchar(100),
    refresh_token_expires_in int,
    foreign key (user_id) references users (user_id)
);
 */
@Getter
@Entity
@NoArgsConstructor
@Table(name = "oauths")
public class OAuthEntity {

    @Id
    private String userId;

    @Column
    private String access_token;

    @Column
    private LocalDateTime expires_in;

    @Column
    private String refresh_token;

    @Column
    private LocalDateTime refresh_token_expires_in;

    @Builder
    public OAuthEntity(String userId, String access_token, LocalDateTime expires_in, String refresh_token, LocalDateTime refresh_token_expires_in) {
        this.userId = userId;
        this.access_token = access_token;
        this.expires_in = expires_in;
        this.refresh_token = refresh_token;
        this.refresh_token_expires_in = refresh_token_expires_in;
    }
}
