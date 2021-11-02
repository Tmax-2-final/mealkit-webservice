package com.example.userservice.controller;

import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.OAuthEntity;
import com.example.userservice.service.OAuthService;
import com.example.userservice.vo.ResponseUser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.env.Environment;

import java.util.Date;

@Slf4j
@RestController
@RequestMapping("/oauth")
public class OAuthController {

    private final OAuthService oAuthService;
    private final Environment env;

    @Autowired
    public OAuthController(OAuthService oAuthService, Environment env) {
        this.oAuthService = oAuthService;
        this.env = env;
    }

    @ApiOperation(value = "카카오 로그인", notes="카카오로 로그인하여 사용자 등록 및 인증 토큰 발급")
    @GetMapping("/callback/kakao")
    public ResponseEntity<ResponseUser> oauthAuthorizationKakaoByCode(@RequestParam("code") String code) {
        log.info(String.format("전달받은 카카오 인증코드: " + code));
        UserDto kakaoUserDto = oAuthService.oauthAuthorizationKakaoByCode(code);

        // 토근 생성
        String token = Jwts.builder()
                .setSubject(kakaoUserDto.getUserId()) // 어떤 정보를 가지고 토큰을 만들 것인가 - userId
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("token.expiration_time")))) // 토큰 만료 기간은 얼마인가. 현재 시간 + 토큰 시간
                .signWith(SignatureAlgorithm.HS512, env.getProperty("token.secret")) // 서명 - 암호화에 사용된 키 종류와 키 값
                .compact();

        HttpHeaders headers = new HttpHeaders();
        headers.set("token", token);
        headers.set("userId", kakaoUserDto.getUserId());
        headers.set("role", kakaoUserDto.getRole());
        headers.set("oauth", kakaoUserDto.getOauth());

        return ResponseEntity.status(HttpStatus.OK).headers(headers).body(null);
    }

    @ApiOperation(value = "카카오 토큰 획득", notes="저장된 카카오 토큰 가져오기")
    @GetMapping("/token/kakao/{userId}")
    public ResponseEntity<OAuthEntity> getUserOauthByUserId(@PathVariable("userId") String userId) {

        OAuthEntity oAuthEntity = oAuthService.getUserOauthByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(oAuthEntity);
    }
}
