package com.example.catalogservice.jpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface CatalogRepository extends JpaRepository<CatalogEntity, Long> {
    CatalogEntity findByCatalogId(Long catalogId);
    Page<CatalogEntity> findByNameLike(String searchData, Pageable pageable);
}