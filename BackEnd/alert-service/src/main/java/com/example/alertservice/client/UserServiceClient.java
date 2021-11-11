package com.example.alertservice.client;

import com.example.alertservice.entity.OAuthEntity;
import com.example.alertservice.error.FeignErrorDecoder;
import com.example.alertservice.vo.ResponseUser;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="user-service", configuration = FeignErrorDecoder.class)
public interface UserServiceClient {

    /* 유저 아이디로 유저 정보 찾기 */
    @GetMapping("/users/{userId}")
    ResponseUser getUser(@PathVariable("userId") String userId);

    /* 유저 아이디로 유저 이메일 찾기 */
    @GetMapping("/users/email/{userId}")
    String getUserEmailByUserId(@PathVariable("userId") String userId);
    /* 유저 아이디로 카카오 토큰 찾기 */
    @GetMapping("/oauth/token/kakao/{userId}")
    OAuthEntity getUserOauthByUserId(@PathVariable("userId") String userId);
}
