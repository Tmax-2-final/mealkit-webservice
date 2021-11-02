package com.example.userservice.service;

import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.OAuthEntity;
import com.example.userservice.jpa.OAuthRepository;
import com.example.userservice.oauth.AuthorizationKakao;
import com.example.userservice.oauth.OAuthKakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {

    private final OAuthKakaoService oAuthKakaoService;
    private final OAuthRepository oAuthRepository;

    /* 카카오 로그인으로 서비스 사용하기 */
    public UserDto oauthAuthorizationKakaoByCode(String code) {
        // 1. 카카오 토큰 발급
        AuthorizationKakao authorizationKakao = oAuthKakaoService.restApiForCallTokenByCode(code);
        // 2. 토큰으로 카카오 회원 정보 가져온 뒤, 기존 가입 유저가 아니라면 회원가입 진행
        UserDto kakaoUserDto = oAuthKakaoService.restApiForCallGetUserByAccessToken(authorizationKakao.getAccess_token());
        log.info("유저 정보: " + kakaoUserDto.getUserId());
        // 3. 카카오 접근 토큰 DB 저장(로그인 마다 갱신되어 저장)
        LocalDateTime accessTokens = LocalDateTime.now().plusSeconds(authorizationKakao.getExpires_in());
        LocalDateTime refreshTokens = LocalDateTime.now().plusSeconds(authorizationKakao.getRefresh_token_expires_in());
        OAuthEntity oAuthEntity = OAuthEntity.builder()
                .userId(kakaoUserDto.getUserId())
                .access_token(authorizationKakao.getAccess_token())
                .expires_in(accessTokens)
                .refresh_token(authorizationKakao.getRefresh_token())
                .refresh_token_expires_in(refreshTokens)
                .build();
        oAuthRepository.save(oAuthEntity);
        return kakaoUserDto;
    }

    /* 카카오 토큰 정보 얻어오기 */
    public OAuthEntity getUserOauthByUserId(String userId) {
        Optional<OAuthEntity> result = oAuthRepository.findByUserId(userId);

        return result.get();
    }
}
