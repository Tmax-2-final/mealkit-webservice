package com.example.userservice.service;

import com.example.userservice.dto.CartDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.CartEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.vo.RequestDate;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

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
    UserDto getUserByUserEmailAndName(String email, String username);

    /* 전체 사용자 목록 반환 */
    Iterable<UserEntity> getUserByAll();

    /* 임시 비밀번호 발급 */
    String updateUserPassword(UserDto userDto);

    /* 카트에 상품 등록하기 */
    CartDto createCart(CartDto cartDto);

    /* 유저의 카트에 담긴 목록 조회하기 */
    Iterable<CartEntity> getUserCartsByUserIdAll(String userId);

    /* 카트에 담겨있는 상품 삭제 */
    void deleteCart(CartEntity cartEntity);

    /* 카트 번호로 카트 상품 삭제 */
    Optional<CartEntity> getCartByCartId(Long cartId);

    /* 유저의 카트 일괄 수정하기 */
    void updateUserCarts(CartDto cartDto);

    /* 특정 회원의 정보 수정하기 */
    void updateUsers(UserDto userDto);

    /* 특정 기간(날짜) 및 검색어가 포함된 모든 유저 조회하기 */
    Iterable<UserEntity> getUserAllBetween(RequestDate requestDate);

    /* 동일한 상품이 있는지 확인하기 */
    CartDto getCartByProductId(CartDto cartDto);

    /* 유저 탈퇴하기 */
    void deleteUser(UserEntity userEntity);

    /* 유저 아이디로 유저 이메일 정보 획득하기 */
    String getUserEmailByUserId(String userId);

    /* 유저 아이디로 카카오 로그인 유저인지 정보 획득하기 */
    String getUserOauthByUserId(String userId);

}
