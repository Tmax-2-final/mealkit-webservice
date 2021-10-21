package com.example.userservice.vo;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;

/*
사용자로 부터 정보를 전달받기 위한 클래스
userId: id,
                pwd: pwd,
                name: name,
                email: email,
                gender: gender,
                birth: birth,
                agree: agree
 */
@Data
public class RequestUser {

    @NotNull(message = "Id cannot be null")
    @Size(min = 6, message = "Id not be less than two characters")
    private String userId;

    @NotNull(message = "Password cannot be null")
    @Size(min = 8, message = "Password must be equal or grater than 8 characters and less than 16 characters")
    private String pwd;

    @NotNull(message = "Name cannot be null")
    @Size(min = 2, message = "Name not be less than two characters")
    private String name;

    @NotNull(message = "Email cannot be null")
    @Size(min = 2, message = "Email not be less than two characters")
    @Email
    private String email;

    private Integer gender;

    private Date birth;

}
