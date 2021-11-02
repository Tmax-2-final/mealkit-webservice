package com.example.catalogservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MyPackageRepository extends JpaRepository<MyPackageEntity, Long> {
    /* 해당 회원이 담은 카트 상품 리스트 전부 조회 */
    Iterable<MyPackageEntity> findAllByUserId(String userId);
    Iterable<MyPackageEntity> findByUserId(String userId);
    Optional<MyPackageEntity> findByCatalogIdAndUserId(Long catalogId, String userId);
}
