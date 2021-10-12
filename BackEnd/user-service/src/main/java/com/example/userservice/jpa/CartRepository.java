package com.example.userservice.jpa;

import com.example.userservice.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    /* 해당 회원이 담은 카트 상품 리스트 전부 조회 */
    Iterable<CartEntity> findAllByUserId(String userId);
    Optional<CartEntity> findByProductIdAndUserId(Long productId, String userId);
}
