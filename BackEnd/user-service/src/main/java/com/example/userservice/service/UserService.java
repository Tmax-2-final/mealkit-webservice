package com.example.userservice.service;

import com.example.userservice.dto.PrfrDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.PrfrEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.vo.RequestDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {

    /* 회원 가입하기 */
    UserDto createUser(UserDto userDto);

    /* 아이디 중복검사 */
    boolean getUserIdForCreateUser(String userId);

    /* 유저 상세 조회 */
    UserDto getUserByUserId(String userId);

    /* 이메일을 가지고 유저 상세 정보 검사하기 */
    UserDto getUserDetailsByUserId(String email);

    /* 비밀번호 찾기(이메일, 이름) */
    UserDto getUserByUserEmailAndName(String userId, String username, String email);

    /* 전체 사용자 목록 반환 */
    Page<UserEntity> getUserByAll(Pageable pageRequest);

    /* 임시 비밀번호 발급 */
    String updateUserPassword(UserDto userDto);

    /* 특정 회원의 정보 수정하기 */
    void updateUsers(UserDto userDto);

    /* 특정 기간(날짜) 및 검색어가 포함된 모든 유저 조회하기 */
    Page<UserEntity> getUserAllBetween(RequestDate requestDate, Pageable pageRequest);

    /* 유저 탈퇴하기 */
    void deleteUser(UserEntity userEntity);

    /* 유저 아이디로 유저 이메일 정보 획득하기 */
    String getUserEmailByUserId(String userId);

    /* 유저 아이디로 카카오 로그인 유저인지 정보 획득하기 */
    String getUserOauthByUserId(String userId);

    /* 유저 수 조회 */
    Long getNewUserCount();
    Long getTotalUserCount();

    /* 선호도 조사 등록하기 */
    PrfrDto createPrfr(PrfrDto prfrDto);

    /* 전체 선호도 조회 */
    Iterable<PrfrEntity> getAllPrfrs();

    /* 특정 회원의 선호도 조회 */
    PrfrEntity getPrfrsByUserId(String userId);

    /* 특정 회원의 선호도 삭제 */
    void deletePrfr(String userId ,Long prfrId);

    /* 특정 회원의 선호도 수정 */
    void updatePrfr(PrfrDto prfrDto, String userId, Long prfrId);

    /* 특정 회원의 선호도 조사 완료 여부 */
    boolean getUserPrfrDone(String userId);
}
