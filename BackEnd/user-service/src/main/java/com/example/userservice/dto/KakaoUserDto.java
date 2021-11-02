package com.example.userservice.dto;

import lombok.Data;

@Data
public class KakaoUserDto {

    private Integer id;
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;

    @Data
    public class Properties {
        private String nickname;
    }

    @Data
    public class KakaoAccount {

        private Profile profile;
        private String email;

        @Data
        class Profile {
            private String nickname;
        }
    }
}
