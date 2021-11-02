package com.example.userservice.oauth;

import com.example.userservice.dto.KakaoUserDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.env.Environment;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthKakaoService {

    private final UserService userService;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final Environment env;

    /* 카카오 인증 코드를 가져와 카카오 유저 토큰정보 받기 rest API */
    public AuthorizationKakao restApiForCallTokenByCode(String code) {
        String grantType = "authorization_code";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("client_id", env.getProperty("kakao.oauth.client-id"));
        params.add("redirect_uri", env.getProperty("kakao.oauth.redirect-uri") + "/oauth/callback/kakao");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        String url = "https://kauth.kakao.com/oauth/token";

        log.info("인증 토큰 발급 시작");
        AuthorizationKakao authorizationKakao = null;
        try{
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            // 성공적으로 토큰을 받았다면
            if(response.getStatusCode() == HttpStatus.OK) {
                authorizationKakao = objectMapper.readValue(response.getBody(), AuthorizationKakao.class);
                log.info("인증 토큰 발급 성공: " + authorizationKakao.getAccess_token());

            }
            else {
                log.error("토큰 발급 실패: " + response.getStatusCode());
            }
        } catch (RestClientException exception) {
            exception.printStackTrace();
            log.error("인증 토큰 발급을 위한 rest api 실패");

        } catch (JsonMappingException e) {
            e.printStackTrace();
            log.error("인증 토큰 발급을 위한 json to object 매핑 실패");

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            log.error("인증 토큰 발급을 위한 json 프로세싱 실패");
        }
        return authorizationKakao;
    }

    /* 카카오 accessToken 을 이용한 유저정보 받기 rest API */
    public UserDto restApiForCallGetUserByAccessToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        String url = "https://kapi.kakao.com/v2/user/me";

        ResponseEntity<String> response = null;
        KakaoUserDto kakaoUserInfoDto = null;
        UserDto kakaoUserForCreateDto = null;

        log.info("유저 정보 불러오기 시작");
        try {
            // 유저 정보 불러오기
            response = restTemplate.postForEntity(url, request, String.class);
            kakaoUserInfoDto = objectMapper.readValue(response.getBody(), KakaoUserDto.class);

            // 회원 정보 삽입하기
            String kakaoKey = env.getProperty("kakao.oauth.pwd-key");
            kakaoUserForCreateDto = new UserDto();
            kakaoUserForCreateDto.setUserId(kakaoUserInfoDto.getKakao_account().getEmail());
            kakaoUserForCreateDto.setPwd(kakaoKey);
            kakaoUserForCreateDto.setEmail(kakaoUserInfoDto.getKakao_account().getEmail());
            kakaoUserForCreateDto.setName(kakaoUserInfoDto.getProperties().getNickname());
            kakaoUserForCreateDto.setOauth("kakao");

            // 기존에 카카오로 가입한 유저인지 체크
            boolean userIdCheck = userService.getUserIdForCreateUser(kakaoUserInfoDto.getKakao_account().getEmail());
            if(userIdCheck == false) {
                log.info("카카오로 가입한 유저가 아닙니다. 회원가입을 진행합니다.");
                userService.createUser(kakaoUserForCreateDto);
            }


        }catch (RestClientException ex) {
            log.info("유저 정보 불러오기 rest api 실패");
            ex.printStackTrace();
        } catch (JsonMappingException e) {
            log.info("유저 정보 불러오기 json to object 매핑 실패");
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            log.info("유저 정보 불러오기 json 프로세싱 실패");
            e.printStackTrace();
        }
        // 값 리턴
        return kakaoUserForCreateDto;
    }
}
