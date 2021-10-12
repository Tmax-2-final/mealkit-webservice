package com.example.userservice.service;

import com.example.userservice.dto.CartDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.CartEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.vo.RequestDate;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {

    UserDto createUser(UserDto userDto);

    UserDto getUserByUserId(String userId);

    /* 이메일을 가지고 유저 상세 정보 검사하기 */
    UserDto getUserDetailsByEmail(String email);

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

    Iterable<UserEntity> getUserAllBetween(RequestDate requestDate);

    /* 동일한 상품이 있는지 확인하기 */
    CartDto getCartByProductId(CartDto cartDto);

    void deleteUser(UserEntity userEntity);
}
